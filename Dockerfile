FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build
RUN npx prisma generate

USER node

EXPOSE 3000
