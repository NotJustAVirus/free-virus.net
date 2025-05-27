FROM php:8.4-apache

WORKDIR /var/www/html
COPY source/ .
RUN chmod -R 777 .

RUN a2enmod rewrite
RUN docker-php-ext-install mysqli

COPY ApacheConf/httpd.conf /etc/apache2/sites-available/000-default.conf
COPY ApacheConf/testserver.htaccess .htaccess