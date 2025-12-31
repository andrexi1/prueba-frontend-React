# Prueba Técnica Frontend - React

Este proyecto es la solución a la prueba técnica de frontend en **React**, enfocada en el consumo de APIs REST, manejo de autenticación, estado y buenas prácticas.

---

## Tecnologías utilizadas

- **React** + **Vite**
- **React Router DOM** v6 (rutas protegidas)
- **Axios** (instancias separadas para subdominios)
- **React Hook Form** (formularios controlados con validación)
- **Context API** (gestión global de autenticación)
- JavaScript (ES6+)

---

## Funcionalidades implementadas

### Autenticación
- Login contra endpoint externo (`POST /api/Authentication/Login`)
- Manejo correcto de token JWT (Bearer)
- Persistencia del token en `localStorage`
- Rutas protegidas mediante contexto de autenticación
- Cierre de sesión con limpieza del token

### Dashboard
- Listado de acciones con paginación obligatoria (`pageNumber` y `pageSize=10`)
- Manejo completo de estados:
  - Loading visible
  - Estado vacío con mensaje claro
  - Manejo de errores de conexión
- Diseño responsivo y limpio con estilos inline

### Crear Acción
- Formulario controlado con validaciones
- Inferencia correcta del endpoint: `POST /api/v1/actions/admin-add`
- Envío mediante **FormData** (multipart/form-data) para soportar upload de icono
- Campos inferidos y obligatorios:
  - `name`
  - `description`
  - `status` (Integer: 1 = activo, 0 = inactivo)
  - `color` (string hex)
  - `icon` (MultipartFile - imagen obligatoria)
- Mensajes de éxito y error claros
- Redirección automática al dashboard tras crear

### Manejo de APIs
- Dos instancias de Axios para subdominios distintos (intencional en la prueba):
  - `authApi` → `https://dev.apinetbo.bekindnetwork.com`
  - `actionsApi` → `https://dev.api.bekindnetwork.com`
- Interceptor global para agregar token Bearer automáticamente

---

## Notas sobre el listado de acciones

- La **creación de acciones funciona al 100%** (verifiable en pestaña Network → POST exitoso con status 201/200).
- El endpoint de listado `/api/v1/actions/admin-list` responde correctamente con la estructura esperada (`{ data: [...] }`).
- En algunos casos puede devolver array vacío si no hay acciones o por estado del backend de desarrollo.
- Se implementó manejo robusto de todos los escenarios (loading, vacío, error) para evitar rompimiento de UI.

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install

3. Ejecutar en modo desarrollo 
npm run dev

4. Abrir el navegador 
http://localhost:5173

5.Iniciar sesión con las credenciales proporcionadas en la prueba técnica.