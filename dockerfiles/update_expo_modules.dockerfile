FROM node:latest

WORKDIR /app

COPY src/mobile_app/package*.json ./
COPY src/mobile_app/app.json ./

CMD ["npm", "install"]