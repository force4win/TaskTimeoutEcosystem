# Ecosistema de Servicios: TaskTimeout y LoginJWT

Este monorepo contiene un ecosistema de dos servicios de Spring Boot y dos aplicaciones de frontend (Angular y React) que trabajan juntos.

1.  **`LoginJWT`**: Un servicio de autenticación responsable de registrar usuarios y emitir tokens JWT.
2.  **`TaskTimeout`**: Un servicio de recursos que consume los tokens JWT para proteger sus endpoints.
3.  **`FrontEndAngular`**: Un cliente web desarrollado en Angular.
4.  **`FrontEndReact`**: Un cliente web desarrollado en React, replicando la funcionalidad de la versión de Angular.

## Estructura del Proyecto

-   `./LoginJWT/`: Contiene el código fuente y la configuración del servicio de autenticación.
-   `./TaskTimeout/`: Contiene el código fuente y la configuración del servicio de tareas.
-   `./FrontEndAngular/`: Contiene el código fuente y la configuración del cliente web Angular.
-   `./FrontEndReact/`: Contiene el código fuente y la configuración del cliente web React.

## Cómo Ejecutar el Ecosistema

Para levantar ambos servicios y uno de los clientes web, sigue estos pasos en terminales separadas desde el directorio raíz del monorepo:

1.  **Iniciar el Servicio de Autenticación (`LoginJWT`)**
    ```bash
    cd LoginJWT
    ./mvnw spring-boot:run
    ```
    El servicio se ejecutará en el puerto `8080`.

2.  **Iniciar el Servicio de Tareas (`TaskTimeout`)**
    ```bash
    cd TaskTimeout
    ./mvnw spring-boot:run
    ```
    El servicio se ejecutará en el puerto `8081`.

3.  **Iniciar el Cliente Web Angular (`FrontEndAngular`)**
    ```bash
    cd FrontEndAngular/TaskTimeOutUi
    npm install
    npm start
    ```
    El cliente web se ejecutará en el puerto `4200`.

4.  **Iniciar el Cliente Web React (`FrontEndReact`)**
    ```bash
    cd FrontEnd/TaskTimeOutUiReact
    npm install
    npm start
    ```
    El cliente web se ejecutará en el puerto `3000`.

## Documentación Específica

Para obtener más detalles sobre la configuración, los endpoints y el funcionamiento de cada servicio, consulta su documentación individual:

-   **[Documentación de `LoginJWT`](./LoginJWT/HELP.md)**
-   **[Documentación de `TaskTimeout`](./TaskTimeout/README.md)**
-   **[Documentación de `FrontEndAngular`](./FrontEndAngular/TaskTimeOutUi/README.md)**
-   **[Documentación de `FrontEndReact`](./FrontEnd/TaskTimeOutUiReact/README.md)**
