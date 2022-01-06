#REACT
FROM node:16.13.1

WORKDIR /app

COPY src/web_app/package*.json ./

RUN npm install

COPY src/web_app/ /.

EXPOSE 3000

CMD ["npm", "start"]