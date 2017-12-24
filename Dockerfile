FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
ENV PORT 80
EXPOSE 80
CMD [ "npm", "run", "server" ]
