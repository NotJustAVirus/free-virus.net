FROM php:8.4-apache

WORKDIR /var/www/html
COPY source/ .
RUN a2enmod rewrite

COPY ApacheConf/httpd.conf /etc/apache2/sites-available/000-default.conf
COPY ApacheConf/testserver.htaccess .htaccess