#REACT
FROM node:16.13.1

WORKDIR /app

COPY src/frontend/package*.json ./

RUN npm install

COPY src/frontend/ /.

EXPOSE 3000

CMD ["npm", "start"]