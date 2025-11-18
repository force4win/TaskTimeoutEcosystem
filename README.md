# Ecosistema de Servicios: TaskTimeout y LoginJWT

Este monorepo contiene un ecosistema de dos servicios de Spring Boot que trabajan juntos:

1.  **`LoginJWT`**: Un servicio de autenticación responsable de registrar usuarios y emitir tokens JWT.
2.  **`TaskTimeout`**: Un servicio de recursos que consume los tokens JWT para proteger sus endpoints.

## Estructura del Proyecto

-   `./LoginJWT/`: Contiene el código fuente y la configuración del servicio de autenticación.
-   `./TaskTimeout/`: Contiene el código fuente y la configuración del servicio de tareas.

## Cómo Ejecutar el Ecosistema

Para levantar ambos servicios, sigue estos pasos en terminales separadas desde el directorio raíz del monorepo:

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

## Documentación Específica

Para obtener más detalles sobre la configuración, los endpoints y el funcionamiento de cada servicio, consulta su documentación individual:

-   **[Documentación de `LoginJWT`](./LoginJWT/HELP.md)**
-   **[Documentación de `TaskTimeout`](./TaskTimeout/README.md)**
