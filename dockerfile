from node:current-alpine3.12 as builder
RUN mkdir -p /usr/app
WORKDIR /usr/app

ADD . /usr/app

RUN npm install 
RUN npm run build
RUN cp package.json .env ormconfig.json ./out


from node:current-alpine3.12
RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY --from=builder /usr/app/out ./
RUN npm install 

ENV WORKING_DIR "/usr/app"

VOLUME $WORKING_DIR
WORKDIR $WORKING_DIR


EXPOSE 3000
CMD npm start

