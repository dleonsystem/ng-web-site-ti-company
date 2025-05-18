#!/bin/bash

# ✅ Variables de entorno
HOST="dleon5555@34.51.45.102"
APP_DIR="/home/dleon5555/ng-web-site-ti-company"

# 🚀 Inicia despliegue
echo "🔧 Iniciando despliegue a producción en $HOST..."

ssh "$HOST" << EOF
set -e
echo "📂 Accediendo al proyecto..."
cd "$APP_DIR"

echo "🔄 Recuperando últimos cambios de 'master'..."
git pull origin master

echo "📦 Instalando dependencias necesarias..."
rm -rf node_modules package-lock.json
npm install

# ⛏️ Verifica que Angular CLI esté disponible
if ! command -v ng &> /dev/null; then
  echo "⚠️ Angular CLI no está instalado. Instalando..."
  sudo npm install -g @angular/cli
fi

# 🧱 Verifica si el builder falta y lo instala si es necesario
if [ ! -d "node_modules/@angular-devkit/build-angular" ]; then
  echo "🔧 Instalando '@angular-devkit/build-angular'..."
  npm install --save-dev @angular-devkit/build-angular
fi

echo "🏗️ Compilando proyecto Angular..."
ng build --configuration production

echo "🔄 Reiniciando servicios con PM2..."
pm2 restart all

echo "✅ Despliegue exitoso"
EOF
