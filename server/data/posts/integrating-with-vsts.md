Currently we use docker hub and a web hook to Azure to continuously deploy to our site.  For a refresher, check out the [migrating to docker](/blog/migrating-to-docker) blog post.  Whenever an image is built, the hook deploys it.  We do run unit tests as part of the image build, but there is no hook to run integration tests.

Now we will change the deployment pipeline and responsibilities of docker hub and Azure.

We will use only use docker hub for storing the images.  We will use Azure only for serving up the web site.  We will now utilize Visual Studio Team Services for building the image, running integration tests, pushing to docker hub, and deploying Azure.

### Setting up the build server

You can use the hosted agents with Visual Studio Team Services but for the free tier, the number of minutes of build per month is limited.

To remove this limitation, I use my home computer as the build server.  It has to have all prerequisite programs installed to run the build.  These are:
- npm
- docker
- vsts build agent

The [following instructions](https://docs.microsoft.com/en-us/vsts/build-release/actions/agents/v2-windows) show how to setup a build agent.

### Setting up the build in Visual Studio Team Systems

Turns out setting up a build is pretty easy.  Especially since we have done the work with docker-compose to build the service and test it.

![Build tasks](/img/integrating-with-vsts/build-tasks.png)


The tasks of the build are:
1. download the source
1. cleanup any data from a previous run
1. run integration using npm
1. publish build artifacts
1. tag the built docker image with the build number
1. publish the build to docker hub

#### Downloading the source

In the build, click the Get sources tab and configure the github account:

![get sources](/img/integrating-with-vsts/get-sources.png)

#### Run integration using npm

From the previous blog post, [Running integration tests](/blog/running-integration-tests), we will use `npm run integration` as a build task to build the image, run unit tests, and run integration tests.

We use the npm task of VSTS to run it.

![npm run integration](/img/integrating-with-vsts/npm-run-integration.png)

#### Publish build artifacts

Publishing the build artifacts gives access to screenshots taken during the integration tests and logs from the build.

In the docker-compose.ci.yaml file we mapped the output path to the local system using a volume.  We can then upload this path from the host to the VSTS server.

![publish artifacts](/img/integrating-with-vsts/publish-artifacts.png)

After the build is done, you can access the artifacts from the Artifacts tab.

![build artifacts](/img/integrating-with-vsts/build-artifact.png)

#### Tagging the build

The local build image is eliakaris/blog:latest.  We want to take it with the build ID so we can keep it connected to the build instance which created it.

This is done with a simple command line task to run docker tag.

![tag with build id](/img/integrating-with-vsts/tag-with-build.png)

#### Push docker image

We have to push the newly created image to docker hub so it can be used in the release.

We do this by using the docker push command.

![docker push](/img/integrating-with-vsts/push-docker-image.png)

### Triggering the build

VSTS supports continuous integration by enabling a build to be triggered from external systems.

We easily trigger the build from both a commit to master in the github repository or a pull request to master.

Clicking the Triggers tab shows the configurations.

Continuous integration:
![continuous integration trigger](/img/integrating-with-vsts/continuous-integration-trigger.png)

Pull request:
![pull request trigger](/img/integrating-with-vsts/pull-request-trigger.png)

### Using VSTS to release to the site

We use Releases in Visual Studio Team System to deploy a completed build docker image to our Azure subscription site.

The release system shares the underlying infrastructure with the build system.  This means we can reuse our local agent and use similar tasks.

Releases trigger from a variety of sources but we will trigger from our CI build when the branch is master.  This means our pull request build validations will not trigger a release.

#### The pipeline

The VSTS release has a notion of a pipeline.  This is how a build gets to deployed to an environment and optionally to other environments.

We only have one environment, but we could have a pre-production environment which we deploy to first before going to production.

Our pipeline is very simple with only our Blog-CI build as the artifact:

![build pipeline and artifacts](/img/integrating-with-vsts/pipeline-and-artifacts.png)

#### Release trigger

We only need one release trigger, a continuous delivery trigger.

Other options are to have a scheduled trigger, but this is more for limiting the amount of releases in a system where many check ins are happening.

Our release trigger looks like the following:
![release trigger](/img/integrating-with-vsts/release-trigger.png)

#### Pre-deployment conditions

We dont have any pre-deployment conditions for our single environment.  We will deploy the build to the production environment whenever a build is ready.

Later we may add more environments and gates to these environments.  Gets could query the deployed service for health or another monitoring service.

![environment pre-deployment conditions](/img/integrating-with-vsts/pre-deployment-conditions.png)

#### Prod environment tasks

There is only one task needed for deploying the docker image to our linux app on Azure.

After connecting our VSTS instance to Azure, we just need to select the Azure subscription, the service to deploy to, and the name of the image to deploy.

The initial setup for the deployment can be seen here:

![deployment tab](/img/integrating-with-vsts/environment-tasks.png)

Here the subsription and application are selected.

Next we add the Azure App Service deployment task.

![app server deployment](/img/integrating-with-vsts/azure-deploy-task.png)

Here the linux web app is specified along with the tag.  The tag is the build id of the build tagged during the build phase.

That's it!  The build is triggered when a commit is merged to master.  The release is triggered after the build is finished, and the code is deployed to azure.