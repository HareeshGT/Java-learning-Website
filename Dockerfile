# Use PHP with Apache
FROM php:8.2-apache

# Install Java (for compiler)
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite (optional)
RUN a2enmod rewrite

# Listen on $PORT (Render sets it; default 10000 for local runs)
ENV PORT=10000
RUN sed -i 's/Listen 80$/Listen ${PORT}/' /etc/apache2/ports.conf && \
    sed -i 's/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/' /etc/apache2/sites-available/000-default.conf

# Copy all your project files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 10000
