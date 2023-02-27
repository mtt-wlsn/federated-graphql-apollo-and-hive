FROM node:16.19.0-bullseye as builder
WORKDIR /app

# Copy over application files
COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]

# Set the appropriate version of yarn
RUN corepack enable
RUN corepack prepare yarn@stable --activate
RUN yarn set version 3.3.0

# Install and then copy dependencies
RUN yarn install --immutable
COPY . .

# Build the application
RUN yarn build:all

FROM node:16.19.0-bullseye
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 80