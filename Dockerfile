
# FROM node:11.9.0-alpine as builder

# WORKDIR /code
# ADD . /code
# RUN npm install --silent
# RUN npm run build

# FROM node:11.9.0-alpine
# RUN apk update && \
#   apk add --update bash

# WORKDIR /code
# RUN npm install express --no-save
# COPY --from=builder /code/server.js /code/server.js
# COPY --from=builder /code/build /code/build
# EXPOSE 3000
# CMD ["node", "server.js"]




FROM node:11.9.0-alpine as builder

WORKDIR /code
ADD . /code
RUN npm install --silent && ls
RUN npm run build

FROM node:11.9.0-alpine
RUN apk update && \
  apk add --update bash

WORKDIR /code
COPY --from=builder /code/package.json /code/package.json
RUN npm install express --no-save && ls
COPY --from=builder /code/server.js /code/server.js
COPY --from=builder /code/build /code/build
EXPOSE 3000
CMD ["node", "server.js"]

