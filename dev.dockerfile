FROM php:8.4-apache

RUN a2enmod rewrite
RUN docker-php-ext-install mysqli

COPY ApacheConf/httpd.conf /etc/apache2/sites-available/000-default.conf