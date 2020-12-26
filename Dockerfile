# FROM truffle

# RUN mkdir -p /erc20commerce
# WORKDIR /erc20commerce

# # COPY . /erc20commerce
# COPY ["truffle-config.js", "./"]

# ENV NODE_ENV=development
# RUN npm install --development 
# FROM node:latest
FROM truffle:latest
# WORKDIR /erc20commerce/backend/
WORKDIR /erc20commerce
# RUN mkdir -p /erc20commerce/backend/
COPY . /erc20commerce
COPY ["./backend/package.json", "./backend/package-lock.json", "/erc20commerce/backend/" ]
# COPY package.json ./erc20commerce/backend/
# COPY package-lock.json ./erc20commerce/backend/
# COPY db.js ./erc20commerce/backend/
# COPY server.js .
ENV NODE_ENV=development
RUN npm install --development
COPY . .
RUN npm install -g ganache-cli
COPY ["./backend/db.js", "./backend/server.js", "/erc20commerce/backend/" ]

# CMD [ "node", "db.js", "server.js" ]

# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
# RUN mkdir /myapp
# WORKDIR /myapp
# ADD package.json /myapp/package.json
# RUN npm install
# ADD . /myapp