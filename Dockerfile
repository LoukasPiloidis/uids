# --- build ------------------------------------------------------------------
FROM node:22-alpine AS build

RUN corepack enable
WORKDIR /app

# Dependency layer first, so source edits don't re-run the install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build-storybook

# --- serve ------------------------------------------------------------------
# Caddy rather than nginx, to match the reverse proxy already on the VPS.
FROM caddy:2-alpine

COPY --from=build /app/storybook-static /srv
COPY docker/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/index.html > /dev/null || exit 1
