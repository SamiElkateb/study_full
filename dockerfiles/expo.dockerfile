#EXPO / REACT NATIVE
FROM node:16.13.1

WORKDIR /app

COPY src/mobile/package*.json ./
COPY src/mobile/app.json ./

RUN npm install --global expo-cli && npm install

ARG EXPO_USERNAME
ARG EXPO_PASSWORD
RUN expo signin --username $EXPO_USERNAME --password $EXPO_PASSWORD

COPY src/mobile/ ./

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["npm", "start"]