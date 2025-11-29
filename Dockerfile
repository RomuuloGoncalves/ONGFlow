# Use uma imagem de linha de comando mais simples
FROM php:8.2-cli

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

# Limpa todos os caches do Laravel para garantir que as variáveis de ambiente sejam lidas corretamente
RUN php artisan config:clear && php artisan route:clear && php artisan view:clear

# Expõe a porta que o Laravel vai usar
EXPOSE 10000

# Comando para iniciar a aplicação
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
