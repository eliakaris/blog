FROM node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src src
COPY bin bin
COPY *.* ./

RUN chmod 755 bin/run_tests.sh

ENV TZ=US/Pacific
ENV CI True

ENV PORT 3002
EXPOSE 3002
CMD [ "bash", "/usr/src/app/bin/run_tests.sh"]
