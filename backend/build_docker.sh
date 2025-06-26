#!/bin/bash

# Script para construir la imagen Docker del sandbox de Python

echo "Construyendo imagen Docker para el sandbox de Python..."

# Construir la imagen usando el Dockerfile específico
docker build -f Dockerfile.python-sandbox -t python-sandbox .

if [ $? -eq 0 ]; then
    echo "Imagen python-sandbox construida exitosamente"
    
    # Mostrar información de la imagen
    echo ""
    echo "Información de la imagen:"
    docker images python-sandbox
    
    echo ""
    echo "Para probar la imagen manualmente, ejecuta:"
    echo "docker run --rm -it python-sandbox python -c \"print('Hola desde el sandbox!')\""
    
    echo ""
    echo "Nota: Esta imagen es independiente de tu aplicación Spring Boot"
    echo "Tu aplicación principal seguirá usando su propio Dockerfile"
else
    echo "Error al construir la imagen"
    exit 1
fi