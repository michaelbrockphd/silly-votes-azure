FROM node:current-alpine

WORKDIR /be-auth-dev/

COPY package.json .
COPY package-lock.json .
COPY src ./src/

RUN npm install

CMD ["node", "src/index.mjs"]
