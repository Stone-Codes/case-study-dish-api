FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

# RUN yarn install

COPY ./src /app/src
COPY ./public /app/public