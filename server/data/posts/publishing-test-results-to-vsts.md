Last [blog post](/blog/integrating-with-vsts) we integrated the build and release of the blog with Visual Studio Team Services.  In this post we will update the system to integrate with the test reporting in VSTS.

With test reporting enabled, we can easily see the summary of the tests run in the build as well as details of which tests were run.

Here is the summary of the tests:

![tests summary](/img/publishing-test-results-to-vsts/test-summary.png)

We can also see the details of the tests:

![tests summary](/img/publishing-test-results-to-vsts/test-details.png)

## Using the JUnit reporter

VSTS supports the JUnit reporter syntax out of the box.  Luckily, both webdriver.io and jest support reports of the JUnit format.

The whole code change can be seen [here](https://github.com/eliakaris/blog/commit/a60a9dc19cab7ce654dcb3b1f5f6657cf5dc208c).

### WebDriver.io JUnit support

JUnit support in webdriver.io requires adding the wdio-junit-reporter npm package and configuring it in the wdio.conf.js file.

The configuration in the wdio.conf.js is simple:
```javascript
reporters: ['spec', 'junit'],
  reporterOptions: {
    junit: {
      outputDir: './.output/'
    }
  },
```

We only override one option, the output directory of the result files.

### Jest JUnit support

To start, we install the jest-junit npm package.

Adding JUnit to jest is a little more complicated because of create-react-app.  To start, since this app is not ejected from package.json, we cannot just put the new reporter in the configuration.  The workaround is to put it as part of the npm test command:

`test": "react-scripts-ts test --env=jsdom --testResultsProcessor=jest-junit`

Then we can add the configuration section for it in the package.config as seen here:

```javascript
"jest-junit": {
  "suiteName": "react unit tests",
  "output": "./.test_output/react-unit-tests.xml",
  "classNameTemplate": "{classname}-{title}",
  "titleTemplate": "{classname}-{title}",
  "ancestorSeparator": " › ",
  "usePathForSuiteName": "true"
},
```

Notice, we have the output in ./.test_output.  I tried putting it in the .output folder so that these tests and the webdriver.io tests would go to the same location.  But, I want to run these tests as part of image creation and it appears when the image is run, that the contents of the .output folder are removed.

Instead, we copy the file from this location to the .output folder later on.

I modified the npm run integration script to do this:
```javascript
"integration": "docker-compose ... && docker-compose -f docker-compose.ci.yaml exec -T web cp /usr/src/app/.test_output/react-unit-tests.xml /usr/src/app/.output/",

```

### Integrating with the build

The change to the build was really simple.  Just added a Publish Test Results task and configure it.

![publish test results task](/img/publishing-test-results-to-vsts/publish-task.png)

That's it!  Tests are running and now being reported!
