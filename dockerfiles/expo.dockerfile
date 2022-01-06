#EXPO / REACT NATIVE
FROM node:16.13.1

WORKDIR /app

COPY src/mobile_app/package*.json ./
COPY src/mobile_app/app.json ./

RUN npm install --global expo-cli && npm install

COPY src/mobile_app/ ./

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["npm", "start"]