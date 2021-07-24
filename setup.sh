#!/bin/bash

cd ./back/app && composer install && cp .env.example .env
docker exec -i back php artisan key:generate
docker exec -i back php artisan migrate
docker exec -i back php artisan db:seed
docker exec -i back php artisan storage:link
docker exec -i back php artisan jwt:secret

echo '........................'
echo 'Setup success!'