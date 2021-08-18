FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./script.js ./

RUN npm install


COPY . .

EXPOSE 3001

CMD [ "index.js" ]

