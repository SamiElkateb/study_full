#PHP
FROM php:8.0-fpm-alpine
 
WORKDIR /var/www/html
 
COPY src/backend ./
 
RUN docker-php-ext-install pdo pdo_mysql
 