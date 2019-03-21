FROM node:9

MAINTAINER Ivanov Dmitry ivanovdmitry@csgo.com 

# Install nodemon
RUN npm install -g nodemon

# TODO: set proper USER

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app


# Run app using nodemon
CMD ["npm", "start"]