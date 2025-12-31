# QA Checklist - Prueba Técnica Frontend

## Flujo completo probado manualmente

- [x] 1. La app carga en http://localhost:5173 y redirige a /login si no hay token
- [x] 2. Login con credenciales correctas devuelve token y redirige al dashboard
- [x] 3. Login con credenciales incorrectas muestra error visible
- [x] 4. Al estar logueado, acceder directamente a /login redirige al dashboard
- [x] 5. Dashboard muestra loading inicial y luego estado vacío o acciones
- [x] 6. Botón "+ Nueva Acción" navega al formulario de creación
- [x] 7. Formulario valida campos requeridos (name, description, status, color, icon)
- [x] 8. Al intentar crear sin icono, muestra error claro
- [x] 9. Al crear acción exitosamente (con todos los campos + imagen), muestra mensaje de éxito y redirige al dashboard
- [x] 10. En Network tab se verifica POST exitoso a /api/v1/actions/admin-add con FormData y status 200/201
- [x] 11. Cerrar sesión elimina token y redirige a login
- [x] 12. Acceder a rutas protegidas sin token redirige a login

## Notas
- La creación de acciones funciona correctamente (verifiable en Network).
- El listado muestra mensaje claro cuando no hay datos.