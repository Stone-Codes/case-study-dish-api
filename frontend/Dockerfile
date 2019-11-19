FROM node:12-alpine  as builder
RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY ./src/ /app/src
COPY ./public/ /app/public
ARG REACT_APP_API_URL
RUN yarn install --production
RUN yarn build

# production environment
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html