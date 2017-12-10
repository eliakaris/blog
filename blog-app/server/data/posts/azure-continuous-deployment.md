Continuous deployment means whenever a change is made to code in a service, it is deployed to production quickly.  Usually this means a deployment every couple of hours or daily.

Besides being pretty cool in that you get your changes out fast, there are actually many practical advantages to using a continuous deployment mechanism.
- The fact that code goes out immediately means you don't have time to do a "test pass".  This means you need to be more careful in your changes usually meaning better changes.
- This method favors multiple small changes instead of big refactors also lowering the chance for bugs.
- This all depends on how good your tests are, unit, integration, database, etc.  Writing good tests means you will have better code, less bugs, and fewer regressions.
- Scheduling becomes easier as you know that once the code is in, it will go out.


Microsoft Azure supports continuous deployment pretty much out of the box.  This is done by utilizing the TfvcContinuousDeployment template.

This blog entry will explain how I setup continuous integration for my project Mpg Meter (<http://mpgmeter.com>).  I pretty much used the template out of the box but did some modifications to allow some integration testing post deployment.


# Step 1 - Modify the current continuous delivery build definition

Having continuous delivery means you need to have great automated tests.  It is also extremely important to make sure that these automated tests run as part of your check in test pass.

Unit tests are great, don't get me wrong, but they often are implemented by mocking out dependencies at the test level.  This means that true end to end testing between components is hard to do.  Also, if one components implementation is changed, it is hard to know how it will affect other components due to the fact that each unit test usually mocks out its dependent components.

In order to solve this issue, it is good to have some integration tests.  These tests do not mock out any of the dependencies except cross service dependencies.  For example, it would be good to mock out the database data a web site relies on, but not the actual connection to a real database.

Integration tests are actually pretty easy to do with web sites.  Web sites are usually stateless and tests can easily be written using basic .net objects such as WebRequest and parsing and verifying a response.  Even more real world tests can be written using frameworks such as selenium and phantom js to allow full browser automation.

The built in continuous delivery build template does not offer support for post deployment integration tests runs.  This post will describe how to modify the current template to allow this.

The first part is pretty easy, we need to create a new build definition and select the current TfvcContinousDeployment template, download it locally, and check it in.

![Selecting the template](/img/AzureContinuousDeployment/01_TemplateSelection.png)

Select the template and click "Download".  Save it in your BuildProcessTemplates folder under your source control, add it to the source repository, and check it in.

After this is done, you can go forward and use the newly checked in build definition for your build.

# Step 2 - Create the continuous delivery build definition

Give it a name and enable it.
![General tab](/img/AzureContinuousDeployment/02_GeneralTab.png)

Set it to trigger on Continuous Integration
![Trigger tab](/img/AzureContinuousDeployment/03_TriggerTab.png)

Map your sources, note that I also pulled in the BuildProcessTemplates/Scripts folder.  We will get more on that later
![Sources](/img/AzureContinuousDeployment/01_SourceTab.png)

Copy to the output folder (the default)
![Build defaults tab](/img/AzureContinuousDeployment/04_BuildsDefaultsTab.png)

The big one is the process, will go into detail later.  For the build template, make sure to select the one from your source control branch.
![Process tab](/img/AzureContinuousDeployment/05_ProcessTab.png)

Click show details and you will be able to select the template you checked in from the drop down.
![Select template](/img/AzureContinuousDeployment/06_SelectTemplate.png)

And I kept the default retention policy
![Retention policy tab](/img/AzureContinuousDeployment/07_RetentionPolicyTab.png)

# Step 3 - Configure the build settings

![Build settings detail](/img/AzureContinuousDeployment/08_BuildSettingsDetail1.png)

You'll notice I have special MSBuild arguments.  The first is the target, which is my windows azure project.  I also include a build target.  This ensures all the other projects also get built.  I have a Windows Phone application which needs to be built by the build server.  If I do not specify the build target for everything, then just the Azure cloud service and its dependencies will be built.

![Build settings detail](/img/AzureContinuousDeployment/09_BuildSettingsDetail2.png)

For the test settings, you'll notice the explicit selection of test assemblies.  This is because not all my tests should run as part of the build.  Some will run post deployment of the project to the staging bed.  These integration tests will be run as part of the custom build steps which will be discussed later.

![Build settings detail](/img/AzureContinuousDeployment/10_BuildSettingsDetail3.png)

For deployment, I create a settings for Windows Azure deployment.  You can configure this by little options button:

![Build settings detail](/img/AzureContinuousDeployment/11_BuildSettingsDetail4.png)

![Build settings detail](/img/AzureContinuousDeployment/12_AzureDeployment.png)

From here, you can import azure settings and set your cloud service configuration.  The deployment is automatically built in to the build process template.

![Build settings detail](/img/AzureContinuousDeployment/13_PostDeployTests.png)

You'll notice there is a new section called Integration Testing.  This is a modification of the default build process template.  This will allow running post build / deploy tests in the system.  I specifically selected the integration tests library to run here.  All the settings here are the same as the other Test section seen before.

# Step 4 - Create your build scripts

The TFS build template allows custom build scripts to be invoked during certain parts of your build.  These scripts allow customization of the build process without actually modifying the build process template.

For my continuous integration, I have 2 build scripts which will run:
1. Pre build script (after source download but before build)
 - The script updates the version of the assemblies to include the changelist number ($env:TF_BUILD_SOURCEGETVERSION), version 2.0.0.(changelistnumber)
 - Updates my WMAppManifest.xml file to include the same changelist number
 - Update the web.config to rename the MpgMeter_AzureTest database configuration to MpgMeter_Test.  Locally the test run uses a database of MpgMeter_LocalTest for test runs.  Only on the build machine is the override done.
2. Post deploy build script (after build and deployment to azure)
 - Prime the deployed environment by doing a query to it.  This starts up the service and JITs the code
 - For the post build script the site url is required.  Preferably this would be retrieved from the deployment step but I havent figured out how to do this as of yet.

Links to the build scripts:
- [Pre-deployment](/etc/AzureContinuousDeployment/PreBuild.ps1)
- [Post-deployment](/etc/AzureContinuousDeployment/PostDeploy.ps1)

# Step 5 - Modify the build definition to add the post deployment steps

The normal tfs template for continuous deployment fits almost all of my needs.  The only one it does not fit is post deployment end to end validation.  For this, we need to run tests after the build and deployment to the test (or production) environment.

After the Get Impacted Tests stage, I added a Run Post Deploy VS Test Runner stage.  This stage is a copy of the Run VS Test Runner stage from before deployment.  It has the only difference in display name and Test Specs property.

The first thing needing to be done is to create an "IntegrationTests" parameter in the build definition.  To do this, open the build template in xaml editor to edit it, then click on the "Overall build process node", then copy and paste the AutomatedTests variable into a new variable and call it IntegrationTests.

After the build template is saved, this will allow setting up a test spec for the post deployment tests.

![New build variable](/img/AzureContinuousDeployment/14_BuildDefinitionNewVariable.png)

Next add the "Run Post Deploy VS Test Runner" step in the process after the "Get Impacted Tests" step.  You can just click on the Run VS Test Runner tab, copy it, and paste it after the "Get Impacted Tests" step.

![Post deploy](/img/AzureContinuousDeployment/15_RunPostDeploy.png)

Click on the newly pasted "Run Post Deploy VS Test Runner" step and modify it to use the previously created IntegrationTests variable for the TestSpecs.

![Integration tests properties](/img/AzureContinuousDeployment/16_IntegrationTestsProperties.png)

After this is done, you can save and check in the build template.  This will then allow you to configure the build fully to do a post deployment step.  Make sure to check in the build template, close and reopen it.  This will show the newly added section.

[Link to the build xaml file](/etc/AzureContinuousDeployment/TfvcContinuousDeploymentTemplate.12.xaml)