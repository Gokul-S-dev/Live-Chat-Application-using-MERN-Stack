# Stage 1
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2
FROM node:18-alpine

WORKDIR /app4

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

RUN npm prune --omit=dev

EXPOSE 5000

CMD ["npm", "server.js"]