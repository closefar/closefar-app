# just install depedencies
FROM node:20.14 AS deps

WORKDIR /app

COPY package.json .

RUN yarn

# start project in development mode
FROM node:20.14 AS dev
# RUN useradd -ms /bin/bash -u 1001 app
# USER app

WORKDIR /app

COPY . .
# COPY --chown=app:app . .
COPY --from=deps /app/node_modules ./node_modules

CMD [ "yarn", "dev:testnet" ]

# build artifact
FROM node:20.14 AS build

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# env is injected by .env.production that you must create it beacuse it isn't in git repo
# ENV NEXT_PUBLIC_ADMIN_COMMISSION=0.1
# ENV NEXT_PUBLIC_API_PATH=http://localhost/api
# ENV NEXT_PUBLIC_FLOW_NETWORK=testnet
# ENV NEXT_PUBLIC_ADMIN_ADDRESS=0xf4a7067c129ca5b9

RUN yarn build

# build and start project in production mode
FROM node:20.14 AS prod

WORKDIR /app

COPY package.json .
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY ./public ./public

CMD [ "yarn", "start" ]