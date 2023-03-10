FROM node:16.13.2-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

CMD ["yarn", "run", "start"]

EXPOSE 3000
