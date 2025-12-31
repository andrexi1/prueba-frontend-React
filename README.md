# Prueba Técnica Frontend - React

Este proyecto corresponde a una prueba técnica de frontend desarrollada en **React**.  
Incluye autenticación, rutas protegidas, dashboard con paginación y formulario de creación de acciones.

---

##  Tecnologías utilizadas

- React + Vite
- React Router DOM
- Axios
- React Hook Form
- Context API
- JavaScript

---

##  Autenticación

- Login contra API externa
- Manejo de token JWT
- Token persistido en `localStorage`
- Rutas protegidas según estado de autenticación
- Botón de cierre de sesión (logout)

---

##  Dashboard

- Listado de acciones desde API
- Manejo de estados: loading, error y vacío
- Paginación usando `pageNumber` y `pageSize`
- UI estable incluso cuando el backend responde con error

---

##  Crear Acción

- Formulario controlado con validaciones
- Envío de datos mediante POST
- Manejo de loading y mensajes de error / éxito
- Acceso protegido por autenticación

---

##  Notas importantes

- El endpoint de listado de acciones puede devolver error dependiendo del entorno.
- Dicho error se maneja correctamente en la UI sin romper la aplicación.
- Las credenciales de login utilizadas son las proporcionadas en la prueba técnica.

---

##  Cómo ejecutar el proyecto

1. Instalar dependencias:
```bash
npm install 

2. Ejecutar el proyecto en modo desarrollo:

npm run dev


3. Acceder a la aplicación en el navegador:

http://localhost:5173