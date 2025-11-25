# Resumen del Ecosistema y Estado del Proyecto

Este documento sirve como un punto de control y contexto para reanudar el trabajo. Contiene el estado actual de los proyectos, decisiones de diseño, datos clave y un registro de las instrucciones de trabajo.

---

## 2. Migración a React y Configuración de H2 (Sesión Actual)

Se ha llevado a cabo una migración completa de la funcionalidad del frontend de Angular a una nueva aplicación implementada con React. Adicionalmente, se ha configurado la base de datos H2 del servicio `TaskTimeout`.

*   **Re-implementación del Frontend con React:**
    *   **Ubicación:** `FrontEnd/TaskTimeOutUiReact/`
    *   **Objetivo:** Alcanzar la paridad funcional con la aplicación existente de Angular.
    *   **Estructura y Dependencias:**
        *   Se ha creado una estructura de carpetas para componentes, servicios, contextos y rutas.
        *   Se han instalado dependencias clave como `axios`, `react-router-dom`, y `react-chartjs-2`.
    *   **Funcionalidad Implementada:**
        *   **Autenticación:** Sistema de login completo usando `React Context` para la gestión del estado de autenticación y `localStorage` para persistir el token JWT.
        *   **Rutas Protegidas:** Implementación de rutas privadas que redirigen al login si el usuario no está autenticado.
        *   **CRUD de Tareas:** Creación del componente `Tasks` que permite crear, leer, actualizar y eliminar tareas, consumiendo la API del backend.
        *   **Gráficos de Tareas:** Re-implementación del componente `TasksChart` usando `react-chartjs-2`, incluyendo:
            *   Gráficos de dona por tarea.
            *   Plugin personalizado para mostrar el porcentaje o los días restantes en el centro.
            *   Tooltips con formato de tiempo legible.
        *   **Estilos:** Se han adaptado los estilos de la aplicación Angular a archivos CSS para los componentes de React.

*   **Configuración de la Consola H2 para `TaskTimeout`:**
    *   **Problema:** El usuario no podía acceder a la consola de la base de datos en memoria H2.
    *   **Solución:**
        *   Se modificó el archivo `SecurityConfig.java` para permitir el acceso público a la ruta `/h2-console/**` y para permitir que la consola se muestre en iframes.
        *   Se actualizó el `application.properties` para habilitar explícitamente la consola H2 y definir la URL de la base de datos (`jdbc:h2:mem:testdb`), solucionando los problemas de conexión del usuario.

---

## 3. Implementación de Gráficos de Tareas (Sesión Anterior)

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

## 4. Estado Actual del Ecosistema (Funcional)

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

## 5. Infraestructura de Base de Datos con Docker

Se ha configurado un entorno de base de datos persistente utilizando Docker y MySQL, que reemplaza la configuración en memoria de H2 para los servicios de backend.

*   **Ubicación:** `Containers/mysql/`
*   **Propósito:**
    *   Proporcionar persistencia de datos para que no se pierdan al reiniciar las aplicaciones.
    *   Simular un entorno de producción más realista.
    *   Aislar la base de datos en su propio contenedor.
*   **Componentes:**
    *   **`docker-compose.yml`:** Define el servicio `mysql-db` con la imagen `mysql:8.0`, mapea el puerto `3306` y gestiona un volumen (`mysql_data`) para la persistencia.
    *   **`init.sql`:** Script que se ejecuta al iniciar el contenedor por primera vez para crear las bases de datos necesarias: `loginjwt_db` y `tasktimeout_db`.
*   **Configuración de los Servicios Backend:**
    *   Se han modificado los archivos `pom.xml` de `LoginJWT` y `TaskTimeout` para reemplazar la dependencia de H2 por `mysql-connector-j`.
    *   Los archivos `application.properties` de ambos servicios han sido actualizados para apuntar a la base de datos MySQL correspondiente (ej. `jdbc:mysql://localhost:3306/loginjwt_db`).
*   **Uso:**
    1.  Navegar a `Containers/mysql`.
    2.  Ejecutar `docker-compose up -d` para iniciar la base de datos.
    3.  Iniciar los servicios de Spring Boot, que se conectarán automáticamente a la base de datos MySQL.

---

## 6. Cambios Realizados (Sesión Antigua)

*   **Implementación de CRUD en Frontend:** Se añadió la funcionalidad completa para Crear, Leer, Actualizar y Eliminar tareas en el componente de Tareas.
*   **Corrección de Flujo de Login:** Se solucionó un problema que impedía la redirección después del login. El error se debía a una discrepancia entre el `JwtResponse` del backend (`accessToken`) y el modelo del frontend (`token`).
*   **Corrección de Detección de Cambios (Zoneless):** Se solucionó un problema por el cual la UI no se actualizaba tras recibir datos. Se inyectó `ChangeDetectorRef` en el componente de Tareas para disparar manualmente la detección de cambios.
*   **Mejoras en la Interfaz:** Se limpió el `app.html` principal, se mejoró el estilo del componente de tareas y se añadieron mensajes de feedback para el usuario.
*   **Gestión del Token JWT:** Se implementó la lógica para que el `TaskService` envíe el token JWT en las cabeceras de las peticiones.

---

## 7. Notas de Desarrollo y Deuda Técnica

*   **Endpoint de Tareas en Backend:** El `TaskController.java` en el backend `TaskTimeout` está mapeado a `/tasks`, pero el frontend está configurado para llamar a `/api/tasktimeout/tasks`. **Esto genera un 404**. Para que la aplicación funcione, se debe corregir el `@RequestMapping` en `TaskController.java` a `@RequestMapping("/api/tasktimeout/tasks")`.
*   **Interceptor vs. Headers Manuales:** El frontend tiene un `AuthInterceptor` que debería añadir el token JWT a todas las peticiones. Sin embargo, para cumplir con una solicitud explícita, se modificó el `TaskService` para añadir las cabeceras de autorización manualmente. Esto es redundante y se considera deuda técnica. El enfoque correcto sería confiar en el interceptor y asegurar que la configuración del backend (CORS, mapping) es correcta.

---

## 8. Archivos y Rutas Clave

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

## 9. Datos Relevantes y Credenciales

*   **Puertos:** `LoginJWT: 8080`, `TaskTimeout: 8081`, `FrontEndAngular: 4200`, `FrontEndReact: 3000`
*   **Endpoints API:**
    *   Login: `POST http://localhost:8080/api/auth/signin`
    *   Tareas (CRUD): `http://localhost:8081/api/tasktimeout/tasks`
*   **Credenciales de Prueba:** `admin/admin123`, `user/password`, `consoleuser/975311`

---

## 10. Instrucciones de Ejecución

1.  **Iniciar Backend `LoginJWT`:** `cd LoginJWT && ./mvnw spring-boot:run`
2.  **Iniciar Backend `TaskTimeout`:** `cd TaskTimeout && ./mvnw spring-boot:run`
3.  **Iniciar Contenedor MySQL:** `cd Containers/mysql && docker-compose up -d`
4.  **Iniciar Frontend Angular:** `cd FrontEndAngular/TaskTimeOutUi && npm install && npm start`
5.  **Iniciar Frontend React:** `cd FrontEnd/TaskTimeOutUiReact && npm install && npm start`

---

## 11. Tareas Pendientes / Próximos Pasos
*   **Frontend:** Añadir un menú de navegación global.
*   **Frontend:** Implementar un sistema de notificaciones más robusto (ej. usando un servicio de "toast").