FROM node:16.19.0-bullseye as builder
WORKDIR /app

# Copy over application files
COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY ["./.yarn/releases", "./.yarn/releases"]

# RUN ls -a

# Install and then copy dependencies
RUN yarn install --immutable
COPY . .

# Build the application
RUN yarn build:order-api
RUN yarn build:catalog-api
RUN yarn build:shopper-api

FROM node:16.19.0-bullseye
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 80