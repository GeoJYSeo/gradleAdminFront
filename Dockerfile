FROM node:12.14.0-alpine3.10

# Create app directory
WORKDIR /web
ADD . /web/

# global install & update
# RUN npm i -g npm && npm i -g yarn

RUN rm yarn.lock
RUN rm package-lock.json
# RUN yarn
RUN yarn install

RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "yarn", "start" ]
