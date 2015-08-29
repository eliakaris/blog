In my last blog entry, I explained how easy it is to do continuous deployment in Windows Azure.  Unfortunately, easy does not necessarily mean that it is easily extensible and easy to understand.

The current system uses windows workflow foundation and team build which is not the most straight foward system.  It requires the team to work in a proprietary system and have Visual Studio to do the most basic operations.

For example, for me to do the continuous integration testing, I had to download the build process template, and modify it in visual studio.  This took a lot of learning, but in the end, it was working, and well.

There are a lot of changes going on in Microsoft, and a lot of them are pretty exciting.  The TFS team has decided that instead of requiring the users to do xaml based workflows, instead they are opening up the build system to be simpler and more extensible through simple scripts and build tasks.

https://msdn.microsoft.com/Library/vs/alm/Build/overview

# The process

The process for running the build, database, and integration tests is the same for the new build system as the old one:
1. Replace the version number in the config files
2. Replace the MpgMeter_AzureTest database key to MpgMeter_Test for the database test
3. Post deploy script to do a request on the newly deployed site

Unlike the previous test, with the new azure build, I do not have to update the url for the Integration tests.  This is because in the azure build scripts, I can modify the environment.

The first step in the new build is to set some environment variables for the build slot and site.  This means that when the integration tests run, they can check for these environment variables and do the proper thing, hitting the newly deployed site.

# The build definition

![The build template](/img/VsoBuildContinuousDeployment/BuildTemplate.png)

As you can see, the build process is very easy to see what's going on.  Just a sequential list of actions to take.  Some actions are already built in, such as build a solution and running of tests, and deploying to azure.

Even better, you can run any powershell or batch script under the azure account.  No need to worry about how to access credentials and such.  Luckily the build process here is very simple, so I don’t need to do anything special, but you could create powershell scripts to do things such as create new slots to deploy to, set slot variables, and anything your deployment requires.

# Conclusion

This system is much easier than the previous build system.  The number of build tasks are also growing each day and they are all open source: https://github.com/Microsoft/vso-agent-tasks

Later maybe instead of using azure web sites deployment, one can you Chef to control deployment.  That is a build task already in development: https://github.com/Microsoft/vso-agent-tasks/tree/master/Tasks/Chef

Have fun with the new build!