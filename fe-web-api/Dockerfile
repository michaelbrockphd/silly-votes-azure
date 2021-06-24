FROM node:current-alpine

WORKDIR /fe-web-api/

ENV JWT_SECRET="gakushuu fukurou"

COPY package.json .
COPY package-lock.json .
COPY src ./src/

RUN npm install

CMD ["node", "src/index.mjs"]
