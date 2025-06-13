FROM node:24.1.0-alpine3.21 AS builder

RUN apk update && apk add git

WORKDIR /app

COPY package*.json ./
COPY docs/package*.json docs/
COPY storybook/package*.json storybook/

RUN npm ci

COPY . .

RUN npm run build


FROM node:24.1.0-alpine3.21 AS server

WORKDIR /srv

COPY server/package.json package.json
COPY server/package-lock.json package-lock.json

RUN npm ci

COPY --from=builder /app/build /srv/build/

COPY server/server.js server/server.js

CMD ["node", "server/server.js"]
