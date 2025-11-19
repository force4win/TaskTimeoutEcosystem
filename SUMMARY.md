# Resumen del Ecosistema y Estado del Proyecto

Este documento sirve como un punto de control y contexto para reanudar el trabajo. Contiene el estado actual de los proyectos, decisiones de diseño, datos clave y un registro de las instrucciones de trabajo.

---

## 1. Estado Actual del Ecosistema (Funcional)

Se ha implementado el flujo completo de autenticación y consumo de datos entre los tres servicios.

*   **`LoginJWT` (Backend - Puerto 8080):**
    *   **Funcionalidad:** Autentica usuarios y emite tokens JWT.
    *   **Configuración Clave:** Se ha configurado **CORS** para permitir peticiones desde el frontend de Angular (`localhost:4200`, `localhost:4202`).
    *   **Datos:** Se inicializan 3 usuarios de prueba al arrancar.

*   **`TaskTimeout` (Backend - Puerto 8081):**
    *   **Funcionalidad:** Expone una API de tareas (actualmente solo lectura) protegida por JWT.
    *   **Configuración Clave:** Se ha configurado **CORS** para permitir peticiones desde el frontend.

*   **`FrontEndAngular` (Frontend - Puerto 4200/4202):**
    *   **Ubicación:** `FrontEndAngular/TaskTimeOutUi/`
    *   **Funcionalidad:**
        *   Un formulario de login que se comunica con `LoginJWT`.
        *   Una vista de "tareas" que se muestra tras un login exitoso.
        *   La vista de tareas obtiene y muestra datos del endpoint protegido de `TaskTimeout`.
    *   **Estructura y Lógica:**
        *   Se han creado servicios (`AuthService`, `TaskService`), componentes (`Login`, `Tasks`), un `AuthGuard` para proteger rutas y un `AuthInterceptor` para adjuntar el token JWT a las peticiones.
        *   Se ha implementado tipado estricto para los modelos de autenticación (`LoginCredentials`, `JwtResponse`).

---

## 2. Archivos y Rutas Clave

*   **Configuración de Seguridad y CORS:**
    *   `LoginJWT/src/main/java/com/alv/aa/cuarllo/LoginJWT/config/SecurityConfig.java`
    *   `TaskTimeout/src/main/java/com/alv/aa/cuarllo/TaskTimeout/config/SecurityConfig.java`

*   **Datos de Prueba (Backend):**
    *   `LoginJWT/src/main/java/com/alv/aa/cuarllo/LoginJWT/config/DataInitializer.java`

*   **Lógica Principal (Frontend):**
    *   Servicios: `FrontEndAngular/TaskTimeOutUi/src/app/services/`
    *   Componentes: `FrontEndAngular/TaskTimeOutUi/src/app/components/`
    *   Modelos de datos: `FrontEndAngular/TaskTimeOutUi/src/app/models/`
    *   Configuración de rutas: `FrontEndAngular/TaskTimeOutUi/src/app/app.routes.ts`
    *   Configuración de la app (providers, interceptors): `FrontEndAngular/TaskTimeOutUi/src/app/app.config.ts`

---

## 3. Datos Relevantes y Credenciales

*   **Puertos:**
    *   `LoginJWT`: `8080`
    *   `TaskTimeout`: `8081`
    *   `FrontEndAngular`: `4200` (o `4202` si el puerto está ocupado)

*   **Endpoints API:**
    *   Login: `POST http://localhost:8080/api/auth/signin`
    *   Obtener Tareas: `GET http://localhost:8081/api/tasktimeout/tasks`

*   **Credenciales de Prueba:**
    *   `admin` / `admin123`
    *   `user` / `password`
    *   `consoleuser` / `975311`

---

## 4. Instrucciones de Ejecución

1.  **Iniciar Backend `LoginJWT`:** `cd LoginJWT && ./mvnw spring-boot:run`
2.  **Iniciar Backend `TaskTimeout`:** `cd TaskTimeout && ./mvnw spring-boot:run`
3.  **Iniciar Frontend Angular:** `cd FrontEndAngular/TaskTimeOutUi && npm install && npm start`

---

## 5. Control General (Instrucciones de Trabajo)

*   **Idioma:** Siempre contestar y analizar en **español**.
*   **Git:** Antes de ejecutar un comando `git` (como `add`, `commit`, `push`), debo **notificarte** y esperar tu instrucción. El entorno actual no tiene `git` en el PATH.
*   **Convenciones de Código (Angular):**
    *   El proyecto `FrontEndAngular` tiene una estructura no estándar para los componentes (ej. `app.ts`, `app.html` en lugar de `app.component.ts`). Debo seguir este patrón al crear o modificar archivos.
    *   Priorizar el tipado estricto sobre el uso de `any`.

---

## 6. Tareas Pendientes / Próximos Pasos

*   **Frontend:**
    *   Crear un modelo de datos (`interface Task`) para tipar las tareas que vienen del backend.
    *   Implementar la funcionalidad de Crear, Actualizar y Eliminar tareas.
    *   Mejorar la interfaz de usuario: limpiar el `app.html` principal, añadir un menú de navegación y proporcionar feedback más claro al usuario (ej. mensajes de error/éxito).
*   **Backend:**
    *   Implementar los endpoints correspondientes para Crear, Actualizar y Eliminar tareas en `TaskTimeout`.
