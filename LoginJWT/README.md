# LoginJWT Service

This service is the authentication and authorization hub for the TaskTimeout ecosystem. It is a Spring Boot application responsible for user registration, login, and the issuance and validation of JSON Web Tokens (JWTs).

## 1. Core Responsibilities

-   **User Registration:** Exposes an endpoint to sign up new users.
-   **User Authentication:** Validates user credentials and, upon success, generates a JWT.
-   **Token Issuance:** Creates and signs JWTs containing user identity and roles.
-   **Token Validation:** Provides an endpoint for other services (like `TaskTimeout`) to verify the validity of a JWT.

---

## 2. Technologies Used

-   **Java 17**
-   **Spring Boot 3.2.5**
-   **Spring Security:** For handling authentication and authorization logic.
-   **Spring Data JPA:** For database interactions.
-   **H2 Database Engine:** An in-memory database for storing user information.
-   **jjwt (Java JWT):** A library for creating and parsing JSON Web Tokens.
-   **SpringDoc OpenAPI (Swagger):** For automatic API documentation.

---

## 3. How to Run

1.  Navigate to the project's root directory:
    ```bash
    cd LoginJWT
    ```
2.  Use the Maven wrapper to start the application:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  The service will start on port **8080**.

---

## 4. Key Endpoints

The API is exposed under the `/api` prefix.

### 4.1. Authentication

-   `POST /api/auth/signin`: Authenticates a user and returns a JWT.
-   `POST /api/auth/signup`: Registers a new user.
-   `POST /api/auth/validateToken`: Validates a provided JWT. This is used by other services in the ecosystem.

### 4.2. API Documentation

-   **Swagger UI:** Once the application is running, the interactive API documentation is available at:
    [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### 4.3. Database Console

-   **H2 Console:** The in-memory database can be accessed for inspection at:
    [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
    -   **JDBC URL:** `jdbc:h2:mem:loginjwt`
    -   **Username:** `sa`
    -   **Password:** (leave blank)

---

## 5. Pre-loaded Data

Upon startup, the service initializes a set of default users for testing purposes. Refer to the `DataInitializer.java` class for details.
-   `admin/admin123`
-   `user/password`
-   `consoleuser/975311`