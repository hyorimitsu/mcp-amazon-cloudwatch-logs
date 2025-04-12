FROM node:22-slim AS build-env

RUN npm install -g pnpm@10.8.0

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .

RUN pnpm run build

FROM gcr.io/distroless/nodejs22-debian12

COPY --from=build-env /app /app
WORKDIR /app

CMD ["build/index.js"]
