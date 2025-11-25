# Dockerized MySQL Database for TaskTimeout Ecosystem

This directory contains the necessary Docker Compose configuration to set up a MySQL database server. This server will host the databases for both the `LoginJWT` and `TaskTimeout` Spring Boot services, replacing their in-memory H2 databases.

## 1. Purpose

The main purpose of this setup is to provide a persistent and centralized MySQL database for the backend services within the `TaskTimeout` ecosystem. This allows for:
-   **Data Persistence:** Data is not lost when applications restart.
-   **Realistic Environment:** Simulates a more production-like database environment.
-   **Isolation:** The database runs in its own isolated container.

## 2. Prerequisites

Before you begin, ensure you have:
-   **Docker Desktop (or Docker Engine)** installed and running on your system.

## 3. Configuration Files

### 3.1. `docker-compose.yml`

This file defines the `mysql-db` service, specifying:
-   The `mysql:8.0` Docker image.
-   A `MYSQL_ROOT_PASSWORD` and a placeholder `MYSQL_DATABASE`.
-   Port mapping (`3306:3306`) to expose MySQL on your host machine.
-   A `volume` to persist database data (`mysql_data`).
-   A key `volume` mapping (`./init.sql:/docker-entrypoint-initdb.d/init.sql`) that ensures the `init.sql` script is executed when the container starts for the first time.

### 3.2. `init.sql`

This script contains SQL commands to be executed upon the MySQL container's initial startup. It ensures that the necessary databases for `LoginJWT` and `TaskTimeout` are created:
-   `loginjwt_db`
-   `tasktimeout_db`

## 4. How to Use

Follow these steps to start the MySQL database and connect your Spring Boot applications.

### 4.1. Start the MySQL Container

1.  Open your terminal or command prompt.
2.  Navigate to this directory:
    ```bash
    cd Containers/mysql
    ```
3.  Execute the following command to build and start the MySQL container in detached mode (in the background):
    ```bash
    docker-compose up -d
    ```
4.  Verify that the container is running:
    ```bash
    docker-compose ps
    ```
    You should see `mysql-db-container` listed with a `State` of `Up`.

### 4.2. Connect Spring Boot Applications

Once the MySQL container is running, you need to modify your `LoginJWT` and `TaskTimeout` services to connect to it. **These changes have already been applied by your assistant.**

**Summary of changes applied:**

-   **`pom.xml` (both projects):**
    -   Removed `com.h2database:h2` dependency.
    -   Added `com.mysql:mysql-connector-j` dependency (version `8.0.33`).

-   **`application.properties` (both projects):**
    -   Removed H2-specific configuration.
    -   Added MySQL connection properties:
        ```properties
        # Example for LoginJWT
        spring.datasource.url=jdbc:mysql://localhost:3306/loginjwt_db
        spring.datasource.username=root
        spring.datasource.password=rootpassword
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
        spring.jpa.hibernate.ddl-auto=update

        # For TaskTimeout, the database name in the URL will be tasktimeout_db
        ```
    *(Note: `rootpassword` is the value set in `docker-compose.yml` for `MYSQL_ROOT_PASSWORD`)*

### 4.3. Run Spring Boot Services

After the MySQL container is up and the applications are configured, start them as usual:

1.  **For `LoginJWT`:**
    ```bash
    cd LoginJWT
    ./mvnw clean install spring-boot:run
    ```
2.  **For `TaskTimeout`:**
    ```bash
    cd TaskTimeout
    ./mvnw clean install spring-boot:run
    ```

Both services will now connect to the MySQL database running in Docker.

## 5. Maintenance

### 5.1. Stop the MySQL Container

To stop the container without removing its data volume:
```bash
docker-compose down
```

### 5.2. Stop and Clean Up (Remove Data)

To stop the container and remove the data volume (useful for a clean start or if you want to clear all data):
```bash
docker-compose down -v
```
**Caution:** This command will permanently delete all data stored in the `mysql_data` volume.
