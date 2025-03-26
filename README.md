# upv-classroom

Este proyecto está dividido en dos partes:
- **Backend:** Laravel (API REST)
- **Frontend:** React (SPA)

## 📌 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- **PHP 8.0+** (con Composer)
- **Node.js 16+** (con npm o yarn)
- **MySQL** o **PostgreSQL**
- **Git**

---
## 🚀 Instalación del Backend (Laravel)

2. **Instalar las dependencias de Laravel:**
   ```sh
   cd ./back-classroom
   composer install
   ```

3. **Copiar el archivo de configuración y generar clave de aplicación:**
   ```sh
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configurar la base de datos en el archivo `.env`**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nombre_de_tu_bd
   DB_USERNAME=usuario
   DB_PASSWORD=contraseña
   ```

5. **Iniciar el servidor:**
   ```sh
   php artisan serve --host=127.0.0.1 --port=8000
   ```

---
## ⚛ Instalación del Frontend (React)

1. **Acceder a la carpeta del frontend:**
   ```sh
   cd ./front-classroom
   ```

2. **Instalar las dependencias:**
   ```sh
   npm install
   ```

3. **Configurar las variables de entorno en `frontend-react/.env`**
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000/api
   ```

4. **Ejecutar la aplicación React:**
   ```sh
   npm start
   ```