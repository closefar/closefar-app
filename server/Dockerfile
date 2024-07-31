# just install depedencies
FROM node:20.14 AS deps

WORKDIR /usr/src/app

COPY package.json .

RUN yarn

# start project in development mode
FROM node:20.14 AS dev

WORKDIR /usr/src/app

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

CMD ["yarn", "start:dev" ]

# build artifact
FROM node:20.14 AS build

WORKDIR /usr/src/app

COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

ENV ADMIN_ADDRESS=f4a7067c129ca5b9
ENV ADMIN_COMMISSION=0.1
ENV NETWORK=testnet
ENV MONGODB_URI=mongodb://mongodb:27017/closefar

RUN yarn build

# build and start project in production mode
FROM node:20.14 AS prod

WORKDIR /usr/src/app

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD [ "yarn", "start:prod" ]