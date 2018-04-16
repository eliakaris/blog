FROM node
WORKDIR /usr/src/app

# ------------------------
# SSH Server support
# ------------------------
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && echo "root:Docker!" | chpasswd

COPY ssh/sshd_config /etc/ssh/
COPY package*.json ./
RUN npm install

COPY public public
COPY server server
COPY src src
COPY bin bin
COPY *.* ./

RUN chmod 755 bin/init.sh
RUN chmod 755 bin/run_tests.sh

ENV TZ=US/Pacific
ENV CI True
RUN npm run test:unit

ARG REACT_APP_INSIGHTS_KEY
ENV REACT_APP_INSIGHTS_KEY=$REACT_APP_INSIGHTS_KEY

RUN printenv
RUN npm run build

ENV PORT 80
EXPOSE 2222 80
CMD [ "bash", "/usr/src/app/bin/init.sh" ]
