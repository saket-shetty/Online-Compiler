FROM node:lts-slim

COPY .  /usr/app/

WORKDIR /usr/app/

RUN npm install

EXPOSE 3000

RUN npm run build

RUN npm install -g serve

CMD serve -s build