Keeping with the theme of using Microsoft Azure for hosting, this blog post will 
describe how to add instrumentation using [Azure's Application Insights](https://azure.microsoft.com/en-us/services/application-insights/).

The blog application has a client and server part, so we are going to explain how to 
instrument the node.js application as well as the react client application.

## Node.js Instrumentation

The blog application uses simple instrumentation for the server side component.  You can 
find detailed information on all the features of the node.js Application Insights
api [here](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-nodejs).

For the simple blog application, we will let the defaults of Application Insights 
do the work for us.

The changes to add server side application insights area really simple as seen by these two 
changes:
- [Initial add](https://github.com/eliakaris/blog/commit/74af90dc53d79ab9508a39ce8be87379e1e7ae3d)
- [Key at startup](https://github.com/eliakaris/blog/commit/34c5e1f156180401ef6ed3fcaff6bb1a1059a985)

Note that the instrumentation key is never specified.  The key is pulled from an environment variable, 
APPINSIGHTS_INSTRUMENTATIONKEY, in the Azure App Service application settings.

![Azure app settings](/img/instrumentation-with-application-insights/azure-app-settings.png)

When migrating to react, the final code change on the server is:

``` javascript
if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  appInsights.setup();
  appInsights.start();
}
```

Application Insights automatically logs general data as described in the [Application Insights Node.js documentation](https://docs.microsoft.com/en-us/azure/application-insights/app-insights-nodejs).

On the developers machine the APPINSIGHTS_INSTRUMENTATIONKEY environment variable is not set so
the telemetry is not sent to the server.

From just these few lines of code, we get automatic instrumentation of metrics such as 
response time seen here:

![Server response time](/img/instrumentation-with-application-insights/server-perf.png)

We can also see text logs of all events logged through the Bunyan logger though the
[Application Insights logging](analytics.applicationinsights.io).  For example, all
request starts are logged and can be inspected:

![Request start log](/img/instrumentation-with-application-insights/request-start-log.png)

## React client side logging

As seen above, adding Application Insights instrumentation to a node.js server side application is easy.
Simply add the npm package, add a couple lines of code, ensure you have an environment variable set, and
everything just works.

Client side logging is a little more complicated, especially if you do not want to check in 
instrumentation keys into our code base.

### The problem

In client side logging, the instrumentation key has to be sent down to the client for use in 
sending the events.  Since our client side code is pre-compiled and does not have access to 
environment variables, another solution has to be determined.

Luckily create-react-app supports "environment variables" at build time.  A good article explaining
the details can be found [here](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d).

Our issue is that we do the react build in a Docker container...

### The attempt

The initial thought was, just set the environment variable in the build machine, expose that environment 
variable in the docker-compose file, and use it in the build.  Unfortunately, this did not work.

Turns out, environment variables are *not* passed through the build phase of the docker image.

### The solution

After much searching, I found the following [guide on build args and docker](https://vsupalov.com/docker-arg-env-variable-guide/).

With this knowledge, the solution was pretty clear.  Still use an environment variable, but pass it
as a build arg to the Dockerfile.  This will allow using it in the client side react code.

The react change was pretty simple, modify index.tsx to add:

``` javascript
if (process.env.REACT_APP_INSIGHTS_KEY) {
  if (AppInsights && AppInsights.downloadAndSetup) {
    AppInsights.downloadAndSetup({ instrumentationKey: process.env.REACT_APP_INSIGHTS_KEY });
    AppInsights.trackPageView();
  }
}
```

The build of the client code will replace all process.env.(env name) with the environment variable
value.

Since the docker build does not support environment variables, we had to add the following before
the build of the client side code in the Dockerfile:

``` Dockerfile
ARG BUILD_REACT_APP_INSIGHTS_KEY=
ENV REACT_APP_INSIGHTS_KEY=$BUILD_REACT_APP_INSIGHTS_KEY

RUN npm run build
```

ARG represents a build argument.  We then set an environment variable inside the container 
to the value of that build argument.

To test this, I ran the following in bash:

```bash
docker build --build-arg BUILD_REACT_APP_INSIGHTS_KEY=test .
```

Sure enough, the instrumentation key in the resulting javascript was "test".

In order to get all this working with npm though, I decided to use the [.env file](https://docs.docker.com/compose/env-file/) feature of docker-compose.

What this allows is variable expansion inside the docker-compose.yaml file based on environment
variables.

The .env file looks like the following:

``` bash
REACT_APP_INSIGHTS_KEY=
```

In our build machine, we will actually specify this value.

Then in the docker-compose.yaml file we have:

``` yaml
version: '3'
services:
  web:
    build:
      context: .
      args:
        - BUILD_REACT_APP_INSIGHTS_KEY=$REACT_APP_INSIGHTS_KEY
    image: eliakaris/blog
```

When `docker-compose up --build` is called, the BUILD_REACT_APP_INSIGHTS_KEY build argument 
is set with the environment variable value REACT_APP_INSIGHTS_KEY.

This also has the added bonus of being able to work in both Windows and Linux/Mac environments.

### Updating the VSTS build

The final piping of the instrumentation key is done in the VSTS build itself.  Here we set a build 
argument named REACT_APP_INSIGHTS_KEY with our instrumentation key for Application Insights.

In our build, you can see the build variable set:

![Build variable](/img/instrumentation-with-application-insights/build-variable.png)

*NOTE: the build variables are also set as environment variables.  Thus when we build from VSTS
our Docker image gets the correct value.*

## Conclusion

In the end, it took a little bit of time to get Application Insights working both in the 
client and server.  This was not due to Application Insights and more due to how complex 
a static client side build is.

But, we do have some nice benefits.  With just a few simple lines of code we can have both
client and server side logic:

![Both logs](/img/instrumentation-with-application-insights/final-logs.png).

And also a nice view of how the calls flow through the system:

![Application map](/img/instrumentation-with-application-insights/application-map.png)

And more to come in the future!
