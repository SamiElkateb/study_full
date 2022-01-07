FROM node:16.13.1

WORKDIR /app

COPY src/frontend/package*.json ./

CMD ["npm", "install"]