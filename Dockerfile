FROM mhart/alpine-node:13.5.0

WORKDIR /usr/src/app
COPY . .

RUN apk update && apk upgrade && apk add git && apk add python && apk add make && apk add g++ && npm i

EXPOSE 3000

CMD ["npm", "start"]
