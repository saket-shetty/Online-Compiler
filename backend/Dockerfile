FROM timbru31/java-node:11-jdk

COPY . /usr/app/

WORKDIR /usr/app/

RUN apt update
RUN apt install python3
RUN apt install golang-go -y

RUN npm install

VOLUME [ "/usr/app/" ]

EXPOSE 8080

CMD [ "npm", "run", "dev" ]