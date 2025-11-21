# Resumen del Ecosistema y Estado del Proyecto

Este documento sirve como un punto de control y contexto para reanudar el trabajo. Contiene el estado actual de los proyectos, decisiones de diseño, datos clave y un registro de las instrucciones de trabajo.

---

## 2. Implementación de Gráficos de Tareas (Sesión Actual)

Se ha desarrollado un nuevo componente en Angular (`TasksChartComponent`) para visualizar el estado de las tareas de una forma gráfica e intuitiva.

*   **Componente:** `FrontEndAngular/TaskTimeOutUi/src/app/components/tasks-chart/`
*   **Funcionalidad clave:**
    *   **Gráficos de Dona por Tarea:** Se muestra un gráfico de dona individual para cada tarea.
    *   **Visualización de Tiempo:** Cada dona representa el tiempo transcurrido (en gris) y el tiempo restante (en rojo), permitiendo una rápida evaluación del progreso.
    *   **Texto Central Configurable:** En el centro de cada dona, se muestra información clave. Se ha implementado una configuración (`displayMode`) para alternar entre:
        *   El **porcentaje** de tiempo restante.
        *   El número de **días** restantes.
    *   **Tooltips Informativos:** Al pasar el cursor sobre un segmento del gráfico, un tooltip muestra el tiempo exacto (formateado en días, horas y minutos) en lugar de milisegundos.
    *   **Plugin Personalizado de Chart.js:** Para mostrar el texto en el centro de la dona, se creó un plugin personalizado de Chart.js. Se utilizó "module augmentation" de TypeScript para extender las definiciones de tipo del plugin y permitir pasarle opciones personalizadas.
    *   **Navegación:** El componente incluye un botón para volver a la vista principal de tareas.

---

## 3. Estado Actual del Ecosistema (Funcional)

Se ha implementado el flujo completo de autenticación y **gestión de tareas (CRUD)** entre los tres servicios.

*   **`LoginJWT` (Backend - Puerto 8080):**
    *   **Funcionalidad:** Autentica usuarios y emite tokens JWT.
    *   **Configuración Clave:** Se ha configurado **CORS** para permitir peticiones desde el frontend de Angular (`localhost:4200`, `localhost:4202`).
    *   **Datos:** Se inicializan 3 usuarios de prueba al arrancar.

*   **`TaskTimeout` (Backend - Puerto 8081):**
    *   **Funcionalidad:** Expone una API REST para la gestión completa de tareas (CRUD), protegida por JWT.
    *   **Configuración Clave:** Se ha configurado **CORS** para permitir peticiones desde el frontend. Los endpoints de la API se encuentran en `http://localhost:8081/tasks/`.

*   **`FrontEndAngular` (Frontend - Puerto 4200/4202):**
    *   **Ubicación:** `FrontEndAngular/TaskTimeOutUi/`
    *   **Funcionalidad:**
        *   Un formulario de login funcional que redirige a la página de tareas.
        *   Una vista de "tareas" que permite **Crear, Leer, Actualizar y Eliminar (CRUD)** tareas.
        *   La vista de tareas se comunica con el endpoint protegido de `TaskTimeout`.
        *   Muestra mensajes de feedback (éxito/error) al usuario.
        *   La UI se actualiza correctamente en un entorno **zoneless**.
    *   **Estructura y Lógica:**
        *   Servicios (`AuthService`, `TaskService`), componentes (`Login`, `Tasks`), `AuthGuard` y `AuthInterceptor` están implementados.
        *   Se ha implementado tipado estricto para los modelos (`LoginCredentials`, `JwtResponse`, `Task`, `TaskRequest`).

---

## 4. Cambios Realizados (Sesión Anterior)

*   **Implementación de CRUD en Frontend:** Se añadió la funcionalidad completa para Crear, Leer, Actualizar y Eliminar tareas en el componente de Tareas.
*   **Corrección de Flujo de Login:** Se solucionó un problema que impedía la redirección después del login. El error se debía a una discrepancia entre el `JwtResponse` del backend (`accessToken`) y el modelo del frontend (`token`).
*   **Corrección de Detección de Cambios (Zoneless):** Se solucionó un problema por el cual la UI no se actualizaba tras recibir datos. Se inyectó `ChangeDetectorRef` en el componente de Tareas para disparar manually la detección de cambios.
*   **Mejoras en la Interfaz:** Se limpió el `app.html` principal, se mejoró el estilo del componente de tareas y se añadieron mensajes de feedback para el usuario.
*   **Gestión del Token JWT:** Se implementó la lógica para que el `TaskService` envíe el token JWT en las cabeceras de las peticiones.

---

## 5. Notas de Desarrollo y Deuda Técnica

*   **Endpoint de Tareas en Backend:** El `TaskController.java` en el backend `TaskTimeout` está mapeado a `/tasks`, pero el frontend está configurado para llamar a `/api/tasktimeout/tasks`. **Esto genera un 404**. Para que la aplicación funcione, se debe corregir el `@RequestMapping` en `TaskController.java` a `@RequestMapping("/api/tasktimeout/tasks")`.
*   **Interceptor vs. Headers Manuales:** El frontend tiene un `AuthInterceptor` que debería añadir el token JWT a todas las peticiones. Sin embargo, para cumplir con una solicitud explícita, se modificó el `TaskService` para añadir las cabeceras de autorización manualmente. Esto es redundante y se considera deuda técnica. El enfoque correcto sería confiar en el interceptor y asegurar que la configuración del backend (CORS, mapping) es correcta.

---

## 6. Archivos y Rutas Clave

*   **Configuración de Seguridad y CORS:**
    *   `LoginJWT/src/main/java/com/alv/aa/cuarllo/LoginJWT/config/SecurityConfig.java`
    *   `TaskTimeout/src/main/java/com/alv/aa/cuarllo/TaskTimeout/config/SecurityConfig.java`
*   **Controlador de Tareas (Backend):**
    *   `TaskTimeout/src/main/java/com/alv/aa/cuarllo/TaskTimeout/controller/TaskController.java`
*   **Servicios y Componentes (Frontend):**
    *   `FrontEndAngular/TaskTimeOutUi/src/app/services/`
    *   `FrontEndAngular/TaskTimeOutUi/src/app/components/`
    *   `FrontEndAngular/TaskTimeOutUi/src/app/interceptors/`
    *   `FrontEndAngular/TaskTimeOutUi/src/app/app.config.ts`

---

## 7. Datos Relevantes y Credenciales

*   **Puertos:** `LoginJWT: 8080`, `TaskTimeout: 8081`, `FrontEndAngular: 4200`
*   **Endpoints API:**
    *   Login: `POST http://localhost:8080/api/auth/signin`
    *   Tareas (CRUD): `http://localhost:8081/api/tasktimeout/tasks`
*   **Credenciales de Prueba:** `admin/admin123`, `user/password`, `consoleuser/975311`

---

## 8. Instrucciones de Ejecución

1.  **Iniciar Backend `LoginJWT`:** `cd LoginJWT && ./mvnw spring-boot:run`
2.  **Iniciar Backend `TaskTimeout`:** `cd TaskTimeout && ./mvnw spring-boot:run`
3.  **Iniciar Frontend Angular:** `cd FrontEndAngular/TaskTimeOutUi && npm install && npm start`

---

## 9. Tareas Pendientes / Próximos Pasos

*   **Backend:** Corregir el `RequestMapping` del `TaskController.java` para que coincida con las llamadas de la API del frontend.
*   **Frontend:** Refactorizar `TaskService` para eliminar la adición manual de headers de autorización y depender únicamente del `AuthInterceptor`.
*   **Frontend:** Añadir un menú de navegación global.
*   **Frontend:** Implementar un sistema de notificaciones más robusto (ej. usando un servicio de "toast").