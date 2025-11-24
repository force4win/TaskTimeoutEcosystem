# Cliente Web React para el Ecosistema TaskTimeout

Este proyecto es una implementación en **React** del cliente web para el ecosistema de servicios `TaskTimeout` y `LoginJWT`. Replica la funcionalidad de la aplicación original de Angular y se comunica con los mismos backends para proporcionar una interfaz de usuario interactiva.

## Propósito

El propósito de esta aplicación es ofrecer una experiencia de usuario fluida para:
1.  Autenticarse en el sistema a través del servicio `LoginJWT`.
2.  Gestionar (ver, crear, editar, eliminar) tareas a través del servicio `TaskTimeout`.
3.  Visualizar el estado de las tareas de forma gráfica.

## Funcionalidades

- **Autenticación de Usuarios:** Formulario de login que valida las credenciales contra el servicio `LoginJWT`, gestionando el estado global con React Context.
- **Navegación Protegida:** Las rutas de la aplicación están protegidas, y solo los usuarios autenticados pueden acceder a las páginas de tareas y gráficos.
- **Gestión de Tareas (CRUD):**
    - **Listar Tareas:** Muestra una lista de todas las tareas existentes.
    - **Crear Tareas:** Permite a los usuarios crear nuevas tareas a través de un formulario.
    - **Actualizar Tareas:** Permite editar tareas existentes.
    - **Eliminar Tareas:** Permite eliminar tareas con una confirmación.
- **Visualización de Gráficos de Tareas:** Presenta una vista de gráficos de dona (`doughnut chart`) para cada tarea, mostrando visualmente el tiempo transcurrido frente al tiempo restante.
- **Feedback al Usuario:** Muestra mensajes de éxito y error para las operaciones de gestión de tareas.

## Cómo Empezar

### Prerrequisitos

Antes de ejecutar esta aplicación, asegúrate de que los siguientes servicios de backend estén en funcionamiento:

*   **`LoginJWT`**: Corriendo en `http://localhost:8080`
*   **`TaskTimeout`**: Corriendo en `http://localhost:8081`

Consulta el `README.md` principal del monorepo para obtener instrucciones sobre cómo iniciar los servicios de backend.

### Instalación y Ejecución

1.  **Navega al directorio del proyecto:**
    ```bash
    cd FrontEnd/TaskTimeOutUiReact
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm start
    ```

Una vez iniciado, abre tu navegador y ve a `http://localhost:3000/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.
