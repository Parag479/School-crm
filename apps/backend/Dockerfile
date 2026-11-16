FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml* ./
COPY packages/ ./packages/
COPY apps/backend/ ./apps/backend/

RUN npm install -g npm@latest
RUN npm install
RUN npm --prefix apps/backend run db:generate
RUN npm --prefix apps/backend run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules

EXPOSE 5000

CMD ["node", "apps/backend/dist/server.js"]

