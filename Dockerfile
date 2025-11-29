# Use a imagem oficial do PHP 8.2
FROM php:8.2-fpm

# Define o diretório de trabalho
WORKDIR /var/www

# Instala dependências do sistema necessárias para o Laravel e PostgreSQL
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libpq-dev \
    libzip-dev

# Instala as extensões do PHP
RUN docker-php-ext-install pdo pdo_pgsql zip bcmath

# Instala o Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia os arquivos da aplicação da sua pasta Backend para o container
COPY Backend/ .

# Roda o composer install para baixar as dependências do PHP
RUN composer install --no-dev --optimize-autoloader

# Ajusta as permissões para as pastas do Laravel
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache
