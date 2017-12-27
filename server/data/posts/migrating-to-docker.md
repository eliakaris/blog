This blog is written using node.js as a backend, but it runs on Windows machines in Azure.  This is because azure supports running node.js.

After learning of the joys of docker (consistent development environment, isolation, etc) it is time to move the blog to docker.

A great docker tutorial can be found at https://docker-curriculum.com/

There are a couple things involved:
1. Create a [Dockerfile](https://github.com/eliakaris/blog/blob/master/Dockerfile) to describe the image
1. Create a dockerhub account to build the container for me continually.
1. Update Azure to run the site on linux using a docker container built from docker hub.

## The Dockerfile

A Dockerfile describes the container:
- the image it is based on, in this case, node.
- the commands to run as part of setting up the container
  - for example, running npm install, npm build, and exposing ports
- the command to run when the container is started

The Dockerfile for the blog is very simple:

```bash
FROM node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
ENV PORT 80
EXPOSE 80
CMD [ "npm", "run", "server" ]
```

Building a docker image locally is easy once you have docker installed.  You can download docker [here](https://www.docker.com/get-docker).

After installing docker, change to the root of the blog repository and run the docker build command:
```bash
docker build . -t eliakaris/blog
```

This will create a docker image for the service and put it in the local repository under the table eliakaris/blog.

## Running the docker image

After building, running a docker image starts up the server.  To do this run the following:

```bash
docker run -p 8080:80 -d eliakaris/blog
```

In the above, -p does a port mapping.  8080 will be the port mapped on the guest operating system while 80 is the port exposed in the docker file.  After running this command you should be able to hit the server by browsing to http://localhost:8080

*NOTE docker run will run the CMD command in the docker file.  For our blog docker file is this CMD [ "npm", "run", "server" ]*

## Docker hub integration

hub.docker.com is a place to retrieve docker images and store your own ones.  It is analogous to packages in npm.org.

The blog docker image is stored at: https://hub.docker.com/r/eliakaris/blog/

You can push to docker hub by doing docker push eliakaris/blog.  And you can pull from docker hub by doing docker pull eliakaris/blog.

Luckily, we dont have to build on our own machines and push when we want to make changes.  Docker hub supports continuous integration with github support.

You can modify build settings of your own docker hub account.  Others can only push.  Just like github.  You can also add others as collaborators.

For example, here is my docker hub build settings.

![Docker hub account](/img/migrating-to-docker/docker-hub-build.png)

Whenever a push is done to master, docker hub will build my image and push it.  It will be exposed with the tag latest, the default tag.

## Deploying the container to Azure

Previously, this blog was hosted on Azure using [Azure App Service web sites](https://azure.microsoft.com/en-us/services/app-service/web/).  As stated above, this was running the node site but on Windows.

Even though Windows is making strides in adding container support, Linux is the standard for running containers.  Luckily, Azure now supports [App Services on Linux](https://azure.microsoft.com/en-us/blog/general-availability-of-app-service-on-linux-and-web-app-for-containers/).

To move the service over, I created a new Azure App Service for Linux, deployed my eliakaris/blog container to it from Docker hub, verified it worked, and then updated my dns in CloudFlare.

After creating the app, you can get the Azure web hook url by going to service dashboard.

Here's my service dashboard:

![Service dashboard](/img/migrating-to-docker/web-hook.png)

Then use the service hook and add it to docker hub.  This hook will be called whenever an image is pushed to docker hub which happens whenever a git change is submitted in github.

![Docker web hook](/img/migrating-to-docker/web-hook-in-docker.png)

## That's all for today!

That's all for today folks!
