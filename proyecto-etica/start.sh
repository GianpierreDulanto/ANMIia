#!/bin/bash

# Script de inicio para producción
# Construye la aplicación React y la sirve

echo "🔨 Construyendo la aplicación..."
npm run build

echo "🚀 Iniciando servidor..."
npm run start:prod

