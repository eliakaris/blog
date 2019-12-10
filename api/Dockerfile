FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY data data
COPY src src
COPY bin bin
COPY *.* ./

RUN chmod 755 bin/init.sh

ENV TZ=US/Pacific
ENV CI True

RUN npm run build

ENV PORT 3001
EXPOSE 2222 3001
CMD [ "bash", "/usr/src/app/bin/init.sh" ]
