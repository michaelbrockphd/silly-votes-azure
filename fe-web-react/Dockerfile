# Build image.
FROM node:current-alpine AS fe_web_react_build

# While more involved, build args are used so that when create-react-app
# builds, the environment variables are set ahead of time.
#
# This is because when build, the current value of environment variables,
# is effectively baked-in to the resulting JS, etc., files.

ARG ARG_B2C_LOGIN_URL
ARG ARG_B2C_TENANT
ARG ARG_B2C_USERFLOW_NAME
ARG ARG_B2C_APP_ID
ARG ARG_FE_AUTH_URL_REDIRECT
ARG ARG_FE_AUTH_URL_REDIRECT_POST_SIGNOUT
ARG ARG_FE_WEB_API_URL

ENV REACT_APP_B2C_LOGIN_URL=${ARG_B2C_LOGIN_URL}
ENV REACT_APP_B2C_TENANT=${ARG_B2C_TENANT}
ENV REACT_APP_B2C_USERFLOW_NAME=${ARG_B2C_USERFLOW_NAME}
ENV REACT_APP_B2C_APP_ID=${ARG_B2C_APP_ID}
ENV REACT_APP_FE_AUTH_URL_REDIRECT=${ARG_FE_AUTH_URL_REDIRECT}
ENV REACT_APP_FE_AUTH_URL_REDIRECT_POST_SIGNOUT=${ARG_FE_AUTH_URL_REDIRECT_POST_SIGNOUT}
ENV REACT_APP_FE_WEB_API_URL=${ARG_FE_WEB_API_URL}

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

CMD ["serve", "-s", "build", "-l", "8000"]
