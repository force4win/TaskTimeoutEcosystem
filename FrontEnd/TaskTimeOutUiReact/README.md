# TaskTimeout React UI

This project is the React web client for the TaskTimeout ecosystem. It was developed to replicate the functionality of the original Angular client, providing a rich user interface to interact with the `LoginJWT` and `TaskTimeout` backend services.

## 1. Core Features

-   **User Authentication:** A login form that authenticates users against the `LoginJWT` service.
-   **Global State Management:** Uses **React Context** (`AuthContext`) to manage and provide global access to the user's authentication state and JWT.
-   **Protected Routes:** Implements a `PrivateRoute` component to protect application routes, redirecting unauthenticated users to the login page.
-   **API Service Layer:** Uses **Axios** in dedicated service files (`authService.js`, `taskService.js`) to handle all communication with the backend, automatically attaching the JWT to protected requests.
-   **Task Management (CRUD):**
    -   **List Tasks:** Displays a list of all existing tasks.
    -   **Create & Update:** Provides a form to create new tasks or edit existing ones.
    -   **Delete Tasks:** Allows for the deletion of tasks.
-   **Task Visualization:** Includes a `TasksChart` component that renders doughnut charts for each task, visually representing the time elapsed vs. time remaining.
-   **User Feedback:** Shows success and error messages for all CRUD operations.

---

## 2. Technologies Used

-   **React 18**
-   **JavaScript (ES6+)**
-   **CSS Modules** for component-level styling.
-   **React Router (`react-router-dom`):** For all client-side routing.
-   **React Context:** For global state management (authentication).
-   **Axios:** As the HTTP client for making API requests.
-   **Chart.js** with the `react-chartjs-2` wrapper for data visualization.

---

## 3. How to Run

### 3.1. Prerequisites

Ensure the backend services are running before starting the client:
-   **`LoginJWT`** on `http://localhost:8080`
-   **`TaskTimeout`** on `http://localhost:8081`

### 3.2. Installation and Execution

1.  Navigate to the project's directory:
    ```bash
    cd FrontEnd/TaskTimeOutUiReact
    ```
2.  Install the required `npm` dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
4.  Open your browser and navigate to **`http://localhost:3000`**.

---

## 4. Project Structure

-   `src/components`: Contains all major UI components (`Login.js`, `Tasks.js`, `TasksChart.js`).
-   `src/services`: Contains the `authService.js` and `taskService.js` for communicating with the backend APIs.
-   `src/contexts`: Includes the `AuthContext.js` for global state management.
-   `src/routes`: Includes the `PrivateRoute.js` component for route protection.
-   `public`: Contains the base `index.html` and other static assets.