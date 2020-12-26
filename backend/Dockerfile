FROM node:latest
# RUN mkdir -p /erc20commerce/backend/
# WORKDIR /erc20commerce/backend/
WORKDIR /erc20commerce
COPY . /erc20commerce
# COPY ["package.json", "package-lock.json", "/erc20commerce/" ]
# COPY ["db.js", "server.js", "/erc20commerce/" ]
# COPY package.json ./erc20commerce/backend/
# COPY package-lock.json ./erc20commerce/backend/
# COPY db.js ./erc20commerce/backend/
# COPY server.js .
ENV NODE_ENV=production
RUN npm install --production
# COPY . .
RUN npm install -g ganache-cli
RUN cd ./backend/

CMD [ "node", "db.js", "server.js" ]

# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev libkrb5-dev
# RUN mkdir /myapp
# WORKDIR /myapp
# ADD package.json /myapp/package.json
# RUN npm install
# ADD . /myapp
