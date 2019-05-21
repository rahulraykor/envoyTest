FROM envoyproxy/envoy-alpine:latest
RUN apk add --update nodejs nodejs-npm
WORKDIR /app
COPY "package.json" "package.json"
RUN npm install --quiet \
  && mv node_modules ../ \
  && ln -s ../node_modules node_modules \ 
  && npm cache clean --force
COPY . .

EXPOSE 5080
CMD node server.js