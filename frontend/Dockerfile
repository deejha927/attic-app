FROM node:16.13.0-buster-slim

RUN apt-get update
WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
CMD ["npm","start"]