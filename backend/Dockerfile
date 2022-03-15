FROM node:12.18.3
RUN apt-get update
WORKDIR /app

RUN npm install nodemon
COPY package.json /app
RUN npm install 
COPY . /app

EXPOSE 8080

CMD ["node", "."]