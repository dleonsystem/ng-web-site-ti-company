#!/bin/bash

# ========================
# Configuración inicial
# ========================
USER="dleon5555"
HOST="34.51.52.179"
APP_DIR="/home/dleon5555/ng-web-site-ti-company"
BRANCH="master"

# ========================
# Inicio del despliegue
# ========================
echo "🚀 Iniciando despliegue a producción en $HOST..."

ssh "$USER@$HOST" << EOF
  set -e  # Detener en caso de error

  echo "📁 Accediendo al directorio del proyecto..."
  cd "$APP_DIR"

  echo "🔄 Recuperando últimos cambios de '$BRANCH'..."
  git fetch origin
  git checkout $BRANCH
  git pull origin $BRANCH

  echo "📦 Instalando dependencias necesarias..."
  npm install --omit=dev

  echo "🏗️ Compilando aplicación Angular..."
  npm run build --prod

  echo "🔁 Reiniciando servicios con PM2..."
  pm2 restart all || pm2 start server.js --name lionsite

  echo "✅ Despliegue completo sin errores."
EOF
