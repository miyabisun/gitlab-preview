FROM node:alpine

ADD . /usr/local/src
WORKDIR /usr/local/src
RUN npm install

RUN mkdir -p /work
WORKDIR /work

EXPOSE 80

CMD ["node", "/usr/local/src/bin/serve"]

