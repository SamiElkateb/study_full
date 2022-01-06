FROM node:16.13.1

WORKDIR /app

COPY src/web_app/package*.json ./

CMD ["npm", "install"]