FROM mongo:4.4.6-bionic

WORKDIR /db-mongo/

# ENV MONGO_INITDB_DATABASE=sillyvotes
ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=babelfish

COPY mongo-init.js /docker-entrypoint-initdb.d/

RUN chmod a+rwx /docker-entrypoint-initdb.d/mongo-init.js

CMD ["mongod", "--auth"]
