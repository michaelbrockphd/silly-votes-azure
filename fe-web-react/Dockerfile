# Build image.
FROM node:current-alpine AS fe_web_react_build

WORKDIR /fe-web-react-build/

COPY package.json .
COPY package-lock.json .
COPY public ./public/
COPY src ./src/

RUN npm install
RUN npm run build

# Deployment image
FROM node:current-alpine

WORKDIR /fe-web-react/

COPY --from=fe_web_react_build /fe-web-react-build/build ./build/

RUN npm -g install serve

CMD ["serve", "-s", "build", "-l", "4000"]
