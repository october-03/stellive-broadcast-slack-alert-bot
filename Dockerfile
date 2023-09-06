FROM node:18.17.1-alpine3.18

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY . .

RUN pnpm i
RUN pnpm run build