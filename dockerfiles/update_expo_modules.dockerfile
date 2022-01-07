FROM node:latest

WORKDIR /app

COPY src/mobile/package*.json ./
COPY src/mobile/app.json ./

CMD ["npm", "install"]