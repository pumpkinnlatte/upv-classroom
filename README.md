# upv-classroom

Este proyecto es un clon de Google Classroom que consta de un frontend en React y un backend en Node.js.

Se incluyen instrucciones para desplegar localmente usando MariaDB 

## Estructura del Proyecto

- `back-classroom/` - Backend en Node.js
- `front-classroom/` - Frontend en React
- `upv_classroom.sql` - Volcado SQL para crear la base de datos


## Requisitos Previos

- Node.js (v16 o superior)
- npm (o yarn)
- MariaDB / MySQL (si no vas a usar Docker)

---


## Screenshots

![Página principal](images//pagina_principal.png)

### Vista de clase - stream
![Class dashboard - stream](images//class_dashboard_stream.png)

### Vista de clase - classmates
![Class dashboard - classmates](images//class_dashboard_classmates.png)

### Vista de clase - classwork
![Class dashboard - classwork](images//class_dashboard_classwork.png)

### Crear anuncio
![Create announcement](images//create_announcement.png)

### Nueva tarea
![New homework](images//new_homework.png)

### Calificar entregas
![Grade submits](images//grade_submits.png)
```

---
## 1) Clonar el repositorio

```bash
git clone https://github.com/pumpkinnlatte/upv-classroom.git
cd upv-classroom
```

---

## 2) Instalar dependencias

Usando npm workspaces:

```bash
npm install
```

Si no, instala manualmente en cada carpeta:

Backend:
```bash
cd back-classroom
npm install
```

Frontend:
```bash
cd ../front-classroom   # o new-front-classroom si tu repo lo usa
npm install
```

## 3) Crear / importar la base de datos

El repositorio contiene un volcado SQL `upv_classroom.sql`.

Opción A — Importar con cliente MySQL/MariaDB local
1. Crea la base de datos:
```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS \`upv_classroom\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

2. Importa el volcado:
```bash
mysql -u root -p upv_classroom < ./upv_classroom.sql
```
---

## 4) Iniciar backend y frontend
```bash
npm run start --workspace front-classroom
```
