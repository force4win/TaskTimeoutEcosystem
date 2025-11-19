# Cliente Web Angular para el Ecosistema TaskTimeout

Este proyecto es el cliente web oficial para el ecosistema de servicios `TaskTimeout` y `LoginJWT`. Ha sido desarrollado con **Angular** y se comunica con los backends para proporcionar una interfaz de usuario interactiva.

## Propósito

El propósito de esta aplicación es ofrecer una experiencia de usuario fluida para:
1.  Autenticarse en el sistema a través del servicio `LoginJWT`.
2.  Gestionar (ver, crear, editar, eliminar) tareas a través del servicio `TaskTimeout`.

## Cómo Empezar

### Prerrequisitos

Antes de ejecutar esta aplicación, asegúrate de que los siguientes servicios de backend estén en funcionamiento:

*   **`LoginJWT`**: Corriendo en `http://localhost:8080`
*   **`TaskTimeout`**: Corriendo en `http://localhost:8081`

Consulta el `README.md` principal del monorepo para obtener instrucciones sobre cómo iniciar los servicios de backend.

### Instalación y Ejecución

1.  **Navega al directorio del proyecto:**
    ```bash
    cd FrontEndAngular/TaskTimeOutUi
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm start
    ```
    o
    ```bash
    ng serve
    ```

Una vez iniciado, abre tu navegador y ve a `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.