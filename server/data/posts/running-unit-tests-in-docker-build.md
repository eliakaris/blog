The typescript 'create-react-app' creates a skeleton application which also includes unit tests.  Unit tests are great for verifying code when in development as well allowing refactoring with confidence.

The unit tests can easily be run by doing npm test from the root directory.  This starts the tests in watch mode.  Whenever a change is made to the code or the tests, they are rerun.  Very nice.

![npm test](/img/running-unit-tests-in-docker-build/npm-test.png)

But this does require the developer run this command before pushing the change.  It would be best if in our build, the tests are run as well.

There are many ways to achieve this goal, but the easiest I've found so far is to just run the tests in the docker image.  Currently, our docker image looks like:

```Dockerfile
FROM node
WORKDIR /usr/src/app

# ------------------------
# SSH Server support
# ------------------------
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd

COPY ssh/sshd_config /etc/ssh/

COPY bin/init.sh bin/
RUN chmod 755 bin/init.sh

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV PORT 80
EXPOSE 2222 80
CMD [ "bash", "/usr/src/app/bin/init.sh" ]
```

In order to run the tests, we simply add the following before the `RUN npm build` command:

```Dockerfile
ENV CI True
RUN npm test
```

NOTE, the setting of the environment CI=true.  If this environment variable is set, then npm test will not run in watch mode.

If the tests fail, then the docker image build will fail.

Here's the [commit](https://github.com/eliakaris/blog/commit/917600bc011df4965ba59a116c41b795325a64c2) that enabled the tests in our build.
