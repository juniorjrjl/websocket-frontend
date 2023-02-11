FROM node:18.14.0

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH /websocket-frontend

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm i vite@4.1.1

RUN npm i

COPY . .