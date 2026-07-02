# Antisocial-UNAHUR

Este proyecto es una red social desarrollada con React-TypeScript (front) y Node-MongoDB (back), que permite a los usuarios registrarse, iniciar sesión, crear publicaciones con imágenes y etiquetas, comentar posteos y visitar perfiles de otros usuarios, asi como seguirlos y dejarlos de seguir.
Se encuentra desplegado en [red-antisocial.vercel.app](https://red-antisocial.vercel.app/)

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Creación de publicaciones
- Creación de nuevas etiquetas
- Sistema de comentarios en las publicaciones
- Perfiles de usuario
- Funciones de seguir y dejar de seguir usuarios
- Rutas protegidas (crear publicación y ver perfil requieren estar autenticado)
- Tema claro/oscuro
- Almacenamiento de datos en la nube y persistencia de la sesión en localStorage

## Tecnologías utilizadas

- React
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React (iconos)
- Node con Express
- MongoDB y Mongoose
- Redis para almacenamiento en caché
- Docker y Docker Compose

## Instrucciones para correr el repositorio localmente

### Requisitos previos

- Node.js
- Docker y Docker compose para el back-end
- El backend de Antisocial corriendo localmente (Se puede clonar desde: https://github.com/lucaCarlino04/red-antisocial-back.git). Ese mismo repositorio contiene sus propias instrucciones para correrlo y es necesario para visualizar correctamente este trabajo.

### Pasos

Una vez completada la instalación del repositorio del backend, seguir estos pasos.

1. Cloná el repositorio o descomprimí el proyecto:

```bash
   git clone "https://github.com/rodrigoleonel1/unahur-antisocial"
   cd antisocial
```

2. Instalá las dependencias:

```bash
   npm install
```

3. Verificá el archivo `.env` debe contener la URL base del backend:

```
   VITE_API_URL=http://localhost:3000
```

4. Iniciá el servidor:

```bash
   npm run dev
```

5. Abrí http://localhost:5173 en el navegador.

## URL de la API utilizada

El el proyecto consume una API propia, disponible para clonar desde:

https://github.com/lucaCarlino04/red-antisocial-back.git
