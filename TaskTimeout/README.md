# TaskTimeout Service

This service is the resource hub for the TaskTimeout ecosystem. It is a Spring Boot application responsible for managing tasks (CRUD operations). Access to its endpoints is protected and requires a valid JSON Web Token (JWT).

## 1. Core Responsibilities

-   **Task Management:** Provides a full CRUD (Create, Read, Update, Delete) API for managing user tasks.
-   **Data Calculation:** Dynamically calculates and provides computed fields for tasks, such as the total duration and remaining days.
-   **Endpoint Protection:** Secures its endpoints, requiring a valid JWT in the `Authorization` header for access.

## 2. Architectural Design: Delegated Authentication

A key architectural feature of this service is its handling of authentication. Instead of validating JWTs locally, it **delegates** the validation to the `LoginJWT` service.

-   It uses a custom security filter (`AlvAuthFilter`) to intercept incoming requests and extract the JWT.
-   It then uses a **Spring Cloud Feign client** (`AuthClient`) to make a REST API call to `LoginJWT`'s `/api/auth/validateToken` endpoint.
-   Access is granted only if `LoginJWT` confirms the token's validity.

---

## 3. Technologies Used

-   **Java 17**
-   **Spring Boot 3.2.5**
-   **Spring Security:** For handling endpoint protection and the security filter chain.
-   **Spring Cloud OpenFeign:** For declarative REST API communication with the `LoginJWT` service.
-   **Spring Data JPA:** For database interactions.
-   **H2 Database Engine:** An in-memory database for storing task information.
-   **SpringDoc OpenAPI (Swagger):** For automatic API documentation.

---

## 4. How to Run

1.  Navigate to the project's root directory:
    ```bash
    cd TaskTimeout
    ```
2.  Use the Maven wrapper to start the application:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  The service will start on port **8081**.

---

## 5. Key Endpoints

The API is exposed under the base path `/api/tasktimeout`.

### 5.1. Task API

-   `GET /api/tasktimeout/tasks`: Retrieves a list of all tasks with calculated fields.
-   `POST /api/tasktimeout/tasks`: Creates a new task.
-   `PUT /api/tasktimeout/tasks/{id}`: Updates an existing task.
-   `DELETE /api/tasktimeout/tasks/{id}`: Deletes a task.

### 5.2. API Documentation

-   **Swagger UI:** Once the application is running, the interactive API documentation is available at:
    [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)

### 5.3. Database Console

-   **H2 Console:** The in-memory database can be accessed for inspection at:
    [http://localhost:8081/h2-console](http://localhost:8081/h2-console)
    -   **JDBC URL:** `jdbc:h2:mem:testdb`
    -   **Username:** `sa`
    -   **Password:** (leave blank)