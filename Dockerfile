FROM node:24.1.0-alpine3.21 AS builder

RUN apk update --no-cache && apk add --no-cache git

WORKDIR /app

COPY package*.json ./
COPY docs/package*.json docs/
COPY storybook/package*.json storybook/
COPY server/package*.json server/

RUN npm ci

COPY . .

ARG SELF_HOSTED
ARG SELF_HOSTED_SHARE
ARG SELF_HOSTED_BROADCAST
ARG BROADCAST_PORT
ARG SANDBOX_HOST_NAME
ARG SANDBOX_PORT
ARG FIREBASE_CONFIG
ARG DOCS_BASE_URL

RUN if [ "$DOCS_BASE_URL" == "null" ]; \
  then npm run build:app; \
  else timeout 600 npm run build; \
  fi

FROM node:24.1.0-alpine3.21 AS server

RUN addgroup -S appgroup
RUN adduser -S appuser -G appgroup

RUN mkdir -p /srv && chown -R appuser:appgroup /srv

USER appuser

WORKDIR /srv

COPY server/package*.json ./

RUN npm ci

COPY --from=builder /app/build/ build/

COPY functions/ functions/
COPY server/src/ server/src/
COPY src/livecodes/html/sandbox/ server/src/sandbox/

CMD ["node", "server/src/app.ts"]
