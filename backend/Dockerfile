FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./
COPY package-lock.json* ./
RUN npm install

COPY prisma.config.ts ./
COPY prisma ./prisma
COPY .env .env
COPY src ./src
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY README.md ./

RUN npx prisma generate || true

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run start:dev"]