FROM node:latest

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y bash git openssh-server && apt-get install libfontconfig && apt-get install python && apt-get install make && apt-get install g++ && apt-get install --yes graphicsmagick 

ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install

COPY . .

EXPOSE 8008

# RUN INSTALL APIDOC GLOBALLY IN CONTAINER
RUN npm install apidoc -g
# RUN API DOC COMMAND
RUN apidoc -i controllers/  -o public/

# RUN SERVICE
CMD [ "node", "index.js"]

