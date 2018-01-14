Integration tests are run to verify the end to end of a service actually started.

Unlike unit tests which run in complete isolation, integration tests actually start services 
and verify scenarios such as:
- application startup
- calls to api resources
- html rendering
- browser rendering and client javascript execution

## Technologies used

The following technologies are utilized to perform stable integration testing:
- [docker-compose](https://docs.docker.com/compose/)
- [selenium standalone](https://hub.docker.com/r/selenium/standalone-chrome/)
- webdriver.io

### Docker-Compose

Docker-compose defines how to combine multiple docker containers and the interaction between them.  For our integration testing scenarios, we will use three features of them:
- services
- volumes
- implicit network creation

To start, we will define a couple services, our blog service, and the selenium/standalone-chrome service.  Docker-compose will use the "depends_on" attribute under the blog service (defined as web) to ensure that selenium starts before our web service.

We also use the volumes feature to map a folder from inside the web container to the local host.  This will help us access test run logs when the tests are run.

Lastly we use the implicit network created whenever a docker-compose up command is run.

Basically, docker-compose translates its yaml file format into a sequence of docker commands.

For example, it starts by creating a network with `docker network create`.

Then it determines the service dependency graph using the depends_on attribute and starts each service with a `docker run --network (network created before) --volume [volume mappings] [service]`.

Simply running `docker-compose -f docker-compose.ci.yaml up` will start the service.

The whole docker-compose yaml file [here](https://github.com/eliakaris/blog/blob/master/docker-compose.ci.yaml):

```yaml
version: '3'
services:
  web:
    build: .
    image: eliakaris/blog
    volumes:
    - ./.output:/usr/src/app/.output
    depends_on:
    - selenium
  selenium:
    image: selenium/standalone-chrome
```

*Notice the `build: .` from above.  This tells docker-compose to build the web image instead of using docker hub.  The `image: eliakaris/blog` gives it the name of the image.* 

### Selenium Standalone

Selenium standalone is a docker container which includes a selenium grid server already pre-configured with a chrome instance.  This is great because it allows a completely self contained selenium grid instance started in the docker compose environment.

We use webdriver.io to utilize our local selenium grid instance to render our page and perform validations.

### Webdriver.io

Webdriver.io provides webdriver bindings for node.js.  It supports using test runners such as mocha and takes care of removing the majority of flakiness in typical selenium browser automation.

We use the [Visual Regression](http://webdriver.io/guide/services/visual-regression.html) service to enable taking screenshots of sections in the page.

We configure webdriver.io with the [wdio.conf.js](https://github.com/eliakaris/blog/blob/master/wdio.conf.js) file.

The important configurations we have separate from the default are:

Using mocha as the test runner (supporting typescript):
```javascript
framework: 'mocha',
mochaOpts: {
  compilers: ['ts:ts-node/register'],
  ui: 'bdd',
},
```

Using chai for assertions:
```javascript
before: function (capabilities, specs) {
  require('ts-node/register'); 
  var chai = require('chai');
  global.expect = chai.expect;
  chai.Should();
},
```

Using the spec reporter:
```javascript
reporters: ['spec'],
```

Using the visual regression service:
```javascript
var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');
 
function getScreenshotName(basePath) {
  return function(context) {
    const fileName = path.parse(context.test.file).base.replace('.mocha.ts', '');
    const elementName = context.options.elementReferenceName ? context.options.elementReferenceName : 'WholePage';

    console.log(path.join(basePath, fileName, elementName + '.png'));
    return path.join(basePath, fileName, elementName + '.png');
  };
}

// ...

services: ['visual-regression'],

visualRegression: {
  compare: new VisualRegressionCompare.LocalCompare({
    referenceName: getScreenshotName(path.join(process.cwd(), 'src/integration-tests/screenshots')),
    screenshotName: getScreenshotName(path.join(process.cwd(), '.output/screenshots/screen')),
    diffName: getScreenshotName(path.join(process.cwd(), '.output/screenshots/diff')),
    misMatchTolerance: 0.01,
  }),

  viewportChangePause: 300,
  viewports: [{ width: 1024, height: 768 }],
  orientations: ['portrait'],
```

To run the tests, simply run:
`node /node_modules/webdriverio/bin/wdio wdio.conf.js --baseUrl http://eliakaris.com --host http://selenium-host`

*Note: baseUrl points to the service to test, host is the location of selenium grid.*

## Writing a test

The integration tests are written in TypeScript.  The [mocha](https://mochajs.org/) framework describes how to run the tests and webdriver.io supports it.

We use [chai](http://chaijs.com/) to perform assertions on the output.

Here's an [example test](https://github.com/eliakaris/blog/blob/master/src/integration-tests/simple.mocha.ts) which loads the homepage, clicks on the archive link, takes a screenshot of the first blog entry I wrote in 2014, navigates to that entry, and then takes a screenshot of that final blog content.

```javascript
it('verifies navigating to the blog list', (done) => {
  browser.url('/');
  browser.element('nav .nav-item:nth-child(3)').click();
  screenshotElement('first-blog', browser.element('div[blog-slug="i-have-a-blog"]'));
  browser.element('div[blog-slug="i-have-a-blog"] a[href="/blog/i-have-a-blog"]').click();
  screenshotElement('first-blog-content', browser.element('article'));
});
```

As you may notice, this is a pretty simple test, readible, and since we are using webdriver.io, stable.

A previous [commit](https://github.com/eliakaris/blog/commit/bb22a497d00ae27cfb618fed1df7f6ea787b1f97) added the blog slug as an attribute to the blog entry div.  This allows us to easily automate the selection of this element in the html.

Pretty neat!

## Executing the tests

We can run the tests on the production service by doing the following:

### Start the local selenium grid:
`docker run -d -p "4444:4444" selenium/standalone-chrome`

### Execute the tests
`node /node_modules/webdriverio/bin/wdio wdio.conf.js --baseUrl http://eliakaris.com --host http://localhost`

This scenario will use a local grid, the tests will run on the host machine, and will utilize the production instance.

This is OK for running some tests before deployment, or to verify that production is running fine.  But, if we want to run these tests in a true sandbox environment we need more.

### Executing the tests in a sandbox environment

To have a sandbox environment to execute the tests, we will utilize docker-compose.

The tests will be run inside the container, we there's a simple shell script to run the webdriver.io command.

```bash
node /usr/src/app/node_modules/webdriverio/bin/wdio wdio.conf.js --host selenium --baseUrl http://web
```

This will be run from inside the running container.  From the docker-compose.ci.yaml file, you'll notice the host is selenium and base url is web.  These are the same names of the services.

To simplify the calls and setup, we just create an npm command in package.json.

Running npm run integration will do the following:
- stop any previous service
- start a docker environment and run the tests in the container
- copy the logs from the container and stop the service

```javascript
"preintegration": "docker-compose -f docker-compose.ci.yaml down",
```

```javascript
"integration": "docker-compose -f docker-compose.ci.yaml up --build --no-color -d && docker-compose -f docker-compose.ci.yaml exec -T web bash /usr/src/app/bin/run_tests.sh",
```

```javascript
"postintegration": "docker-compose -f docker-compose.ci.yaml logs --no-color -t >> ./.output/service_logs.log && docker-compose -f docker-compose.ci.yaml down"
```

That's all for today!
