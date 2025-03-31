# upv-classroom

Este proyecto está dividido en dos partes:
- **Backend:** Express.js (API REST)
- **Frontend:** React (SPA)

## 📌 Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- **Node.js 16+** (con npm)
- **MySQL**
- **Git**

---
## 🚀 Instalación del Backend (Express)

1. **Instalar las dependencias de Laravel:**
   ```sh
   cd ./back-classroom
   npm install express cors mysql2 bcrypt luxon ulid jsonwebtoken
   ```

2. **Iniciar el servidor:**
   ```sh
   npm app.js
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