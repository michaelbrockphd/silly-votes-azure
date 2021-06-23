FROM node:current-alpine

WORKDIR /be-auth-dev/

ENV JWT_SECRET="gakushuu fukurou"

COPY package.json .
COPY package-lock.json .
COPY src ./src/

RUN npm install

CMD ["node", "src/index.mjs"]
