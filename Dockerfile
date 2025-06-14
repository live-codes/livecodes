FROM node:24.1.0-alpine3.21 AS builder

RUN apk update && apk add git

WORKDIR /app

COPY package*.json ./
COPY docs/package*.json docs/
COPY storybook/package*.json storybook/

RUN npm ci

COPY . .

ARG DOCS_BASE_URL

RUN if [ "$DOCS_BASE_URL" == "null" ]; \
  then npm run build:app; \
  else npm run build; \
  fi

FROM node:24.1.0-alpine3.21 AS server

WORKDIR /srv

COPY server/package*.json ./

RUN npm ci

COPY --from=builder /app/build/ /srv/build/

COPY functions/ functions/
COPY server/*.ts server/

CMD ["node", "server/server.ts"]
