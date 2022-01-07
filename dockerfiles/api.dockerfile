#PHP
FROM php:8.0-fpm-alpine
 
WORKDIR /var/www/html
 
COPY src/api ./
 
RUN docker-php-ext-install pdo pdo_mysql
 