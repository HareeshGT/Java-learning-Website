# Use PHP with Apache
FROM php:8.2-apache

# Install Java (for compiler)
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get clean

# Enable Apache rewrite (optional)
RUN a2enmod rewrite

# Copy all your project files
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 80