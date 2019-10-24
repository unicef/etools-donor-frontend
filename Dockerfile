FROM mhart/alpine-node:11 AS builder
RUN apk update
WORKDIR /tmp
ADD package.json /tmp/
ADD package-lock.json /tmp/

RUN npm install --no-save

ADD . /code/
WORKDIR /code
RUN cp -a /tmp/node_modules /code/node_modules
RUN yarn run build

FROM mhart/alpine-node:11
RUN yarn global add serve
WORKDIR /code
COPY --from=builder /code/build /code/build
EXPOSE 3000
CMD ["serve", "-p", "80", "-s", "."]


