# Resumen del Ecosistema de Aplicaciones

Este documento proporciona una visión general de los proyectos que componen este ecosistema de aplicaciones, describiendo el propósito y la tecnología de cada uno.

## Componentes del Ecosistema

El ecosistema está formado por tres componentes principales que trabajan en conjunto:

1.  **`LoginJWT` (Servicio de Autenticación)**
    *   **Propósito:** Gestionar la autenticación de usuarios y la emisión de tokens de seguridad JWT (JSON Web Tokens).
    *   **Tecnología:** Es una aplicación de backend desarrollada con **Spring Boot**.
    *   **Funcionalidades Clave:**
        *   Registro de nuevos usuarios.
        *   Inicio de sesión (signin) que devuelve un token JWT si las credenciales son correctas.
        *   Un endpoint para validar la vigencia y autenticidad de un token.

2.  **`TaskTimeout` (Servicio de Tareas)**
    *   **Propósito:** Proporcionar una API REST para la gestión de tareas. Este servicio consume los tokens generados por `LoginJWT` para proteger sus endpoints.
    *   **Tecnología:** Es una aplicación de backend desarrollada con **Spring Boot**.
    *   **Funcionalidades Clave:**
        *   Endpoints para crear, leer, actualizar y eliminar tareas (CRUD).
        *   Integración con `LoginJWT` para validar los tokens de los usuarios que intentan acceder a los recursos protegidos. La comunicación entre servicios se realiza mediante **OpenFeign**.

3.  **`FrontEndAngular` (Cliente Web)**
    *   **Propósito:** Ofrecer una interfaz de usuario web para que los usuarios interactúen con el ecosistema.
    *   **Tecnología:** Es una aplicación de frontend desarrollada con **Angular**.
    *   **Funcionalidades Clave:**
        *   Formularios de registro e inicio de sesión que se comunican con `LoginJWT`.
        *   Una vez autenticado, el cliente almacena el token JWT y lo utiliza para realizar peticiones seguras al servicio `TaskTimeout` para gestionar las tareas.

## Flujo de Interacción

1.  El usuario se registra o inicia sesión a través de la interfaz de `FrontEndAngular`.
2.  `FrontEndAngular` envía las credenciales a `LoginJWT`.
3.  `LoginJWT` valida las credenciales y, si son correctas, devuelve un token JWT.
4.  `FrontEndAngular` almacena este token y lo adjunta en la cabecera `Authorization` de todas las peticiones futuras a `TaskTimeout`.
5.  `TaskTimeout` recibe las peticiones, extrae el token y se comunica con `LoginJWT` para verificar su validez antes de permitir el acceso al recurso solicitado.


## Control general
Siempre vas a contestar y analizar en español