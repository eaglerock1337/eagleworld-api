FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install && npm cache clean --force
RUN apt update && apt install --no-install-recommends -y fortune-mod fortunes fortunes-off cowsay && apt clean && rm -rf /var/lib/apt/lists/*

ENV PATH /usr/games:/$PATH

COPY . .
EXPOSE 4000

ENTRYPOINT [ "node", "server.js" ]
