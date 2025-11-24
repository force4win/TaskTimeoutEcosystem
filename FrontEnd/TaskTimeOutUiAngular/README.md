# TaskTimeout Angular UI

This project is the Angular web client for the TaskTimeout ecosystem. It provides a rich user interface to interact with the `LoginJWT` and `TaskTimeout` backend services.

## 1. Core Features

-   **User Authentication:** A login form that authenticates users against the `LoginJWT` service and stores the received JWT in local storage.
-   **Protected Routes:** Implements an `AuthGuard` to protect application routes, redirecting unauthenticated users to the login page.
-   **JWT Interceptor:** An `AuthInterceptor` automatically attaches the JWT to the headers of all outgoing HTTP requests to the `TaskTimeout` service.
-   **Task Management (CRUD):**
    -   **List Tasks:** Displays a list of all existing tasks.
    -   **Create & Update:** Provides a form to create new tasks or edit existing ones.
    -   **Delete Tasks:** Allows for the deletion of tasks.
-   **Task Visualization:** Includes a `TasksChartComponent` that renders doughnut charts for each task, visually representing the time elapsed vs. time remaining.
-   **User Feedback:** Shows success and error messages for all CRUD operations.

---

## 2. Technologies Used

-   **Angular 17**
-   **TypeScript**
-   **SCSS** for styling.
-   **Chart.js** with the `ng2-charts` library for data visualization.
-   **Angular Standalone Components:** The application is built using Angular's modern standalone component architecture.
-   **Zoneless Change Detection:** Configured to run in a "zoneless" mode for optimized performance, with manual change detection where necessary.

---

## 3. How to Run

### 3.1. Prerequisites

Ensure the backend services are running before starting the client:
-   **`LoginJWT`** on `http://localhost:8080`
-   **`TaskTimeout`** on `http://localhost:8081`

### 3.2. Installation and Execution

1.  Navigate to the project's directory:
    ```bash
    cd FrontEnd/TaskTimeOutUiAngular
    ```
2.  Install the required `npm` dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
4.  Open your browser and navigate to **`http://localhost:4200`**.

---

## 4. Project Structure

-   `src/app/components`: Contains all major UI components (`Login`, `Tasks`, `TasksChart`).
-   `src/app/services`: Contains the `AuthService` and `TaskService` for communicating with the backend APIs.
-   `src/app/guards`: Includes the `AuthGuard` for route protection.
-   `src/app/interceptors`: Includes the `AuthInterceptor` for attaching JWTs.
-   `src/app/models`: Contains TypeScript interfaces for data models (`Task`, `JwtResponse`, etc.).