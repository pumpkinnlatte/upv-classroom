# upv-classroom

Este proyecto es un clon de Google Classroom que consta de un frontend en React y un backend en Node.js.

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:
- `back-classroom/` - Backend en Node.js
- `new-front-classroom/` - Frontend en React

## Requisitos Previos

- Node.js (v16 o superior)
- MySQL (v8 o superior)
- npm o yarn

## Configuración Inicial

### Backend

1. Navega a la carpeta del backend:
```bash
cd back-classroom
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `config.json` en la carpeta `src/` con la siguiente estructura:
```json
{
  "db": {
    "host": "localhost",
    "user": "tu_usuario",
    "password": "tu_password",
    "database": "nombre_base_datos"
  },
  "jwt": {
    "secret": "tu_secret_key",
    "refreshSecret": "tu_refresh_secret_key"
  },
  "port": 3001
}
```

4. Crea las carpetas necesarias para almacenamiento:
```bash
mkdir uploads
mkdir storage
```

### Frontend

1. Navega a la carpeta del frontend:
```bash
cd new-front-classroom
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `config.json` en la carpeta `src/` con la siguiente estructura:
```json
{
  "api_route": "http://localhost:3001/api"
}
```

## Ejecución del Proyecto

### Backend

1. Inicia el servidor backend:
```bash
cd back-classroom
npm start
```
El servidor se iniciará en `http://localhost:3001`

### Frontend

1. En otra terminal, inicia el servidor de desarrollo de React:
```bash
cd new-front-classroom
npm start
```
La aplicación se abrirá en `http://localhost:3000`

## Características Principales

- Autenticación de usuarios (profesores y alumnos)
- Creación y gestión de clases
- Publicación de anuncios
- Gestión de tareas y materiales
- Calificación de entregas
- Sistema de archivos adjuntos
- Manejo de temas por clase

## Estructura de Carpetas Frontend

```
new-front-classroom/
├── public/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── context/        # Contextos de React
│   ├── css/           # Estilos
│   ├── forms/         # Componentes de formularios
│   ├── hooks/         # Custom hooks
│   ├── pages/         # Páginas principales
│   ├── services/      # Servicios API
│   └── config.json    # Configuración
```

## Estructura de Carpetas Backend

```
back-classroom/
├── src/
│   ├── data-access/   # Capa de acceso a datos
│   ├── middlewares/   # Middlewares
│   ├── routes/        # Rutas API
│   ├── services/      # Lógica de negocio
│   └── config.json    # Configuración
├── storage/           # Almacenamiento de archivos
└── uploads/          # Carpeta temporal de uploads
```

## Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commitea tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.