FROM node
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY public public
COPY src src
COPY *.* ./
COPY bin bin

RUN chmod 755 bin/init.sh

ENV TZ=US/Pacific
ENV CI True
RUN yarn test

ARG BUILD_REACT_APP_INSIGHTS_KEY=
ENV REACT_APP_INSIGHTS_KEY=$BUILD_REACT_APP_INSIGHTS_KEY

RUN yarn build

ENV PORT 3000
EXPOSE 2222 3000
CMD [ "bash", "/usr/src/app/bin/init.sh" ]
