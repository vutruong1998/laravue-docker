FROM php:7.3-fpm-alpine

MAINTAINER VCT

RUN docker-php-ext-install pdo pdo_mysql

# RUN apk add --no-cache \
#       freetype \
#       libjpeg-turbo \
#       libpng \
#       freetype-dev \
#       libjpeg-turbo-dev \
#       libpng-dev \
#     && docker-php-ext-configure gd \
#     && docker-php-ext-install -j$(nproc) gd \
#     && docker-php-ext-enable gd \
#     && apk del --no-cache \
#       freetype-dev \
#       libjpeg-turbo-dev \
#       libpng-dev \
#     && rm -rf /tmp/*

