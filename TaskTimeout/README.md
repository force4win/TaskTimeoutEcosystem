# TaskTimeout API

TaskTimeout es una API RESTful construida con Spring Boot que permite a los usuarios gestionar un dashboard de tareas con fechas de vencimiento.

## Descripción

La idea central del proyecto es soportar un sistema de tareas donde cada tarea tiene una fecha de inicio y una fecha de vencimiento. La API calcula y devuelve dinámicamente los días que han pasado desde el inicio de la tarea y los días que faltan para su vencimiento.

La base de datos se inicializa con datos de ejemplo cada vez que se inicia la aplicación para facilitar las pruebas.

## Características

- **Crear Tareas:** Registra nuevas tareas con descripción, fecha de inicio y fecha de vencimiento (o días hasta el vencimiento).
- **Consultar Tareas:** Obtiene una lista de todas las tareas con información calculada sobre su estado.
- **Actualizar Tareas:** Modifica los detalles de una tarea existente.
- **Eliminar Tareas:** Borra una tarea de la base de datos.

## Tecnologías Utilizadas

- Java 17
- Spring Boot 3
- Maven
- H2 Database (Base de datos en memoria)

## Documentación de la API (Swagger)

El proyecto incluye `springdoc-openapi` para generar documentación de la API de forma automática a través de la especificación OpenAPI 3.0.

Una vez que la aplicación esté en ejecución, puedes acceder a la interfaz de usuario de Swagger para ver todos los endpoints, probarlos directamente desde el navegador e inspeccionar los modelos de datos.

- **URL de Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **URL de la especificación OpenAPI (JSON):** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

## Cómo Empezar

Sigue estos pasos para levantar y ejecutar la aplicación en tu entorno local.

### Prerrequisitos

- Tener instalado Java 17 (o superior).
- Tener Maven instalado (o puedes usar el Maven Wrapper incluido).

### Ejecución

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio raíz del proyecto.
3. Ejecuta el siguiente comando para iniciar la aplicación:

   ```bash
   ./mvnw spring-boot:run
   ```

La API estará disponible en `http://localhost:8080`.

## Endpoints de la API

A continuación se detallan los endpoints disponibles y cómo interactuar con ellos.

### 1. Obtener todas las tareas

Recupera una lista de todas las tareas almacenadas en la base de datos, ordenadas por fecha de vencimiento y con campos calculados.

- **Método:** `GET`
- **URL:** `/tasks`

**Ejemplo con cURL:**

```bash
curl http://localhost:8080/tasks
```

**Respuesta de Ejemplo:**

```json
[
    {
        "id": 2,
        "description": "Crear el modelo de datos de la base de datos",
        "startDate": "2025-10-23",
        "dueDate": "2025-11-02",
        "totalTaskDays": 10,
        "daysRemainingForDueDate": -5
    },
    {
        "id": 1,
        "description": "Configurar el entorno de desarrollo",
        "startDate": "2025-11-05",
        "dueDate": "2025-11-17",
        "totalTaskDays": 12,
        "daysRemainingForDueDate": 10
    }
]
```

### 2. Obtener todas las tareas (sin procesar)

Recupera una lista de todas las tareas tal como están en la base de datos, sin campos calculados. Es útil para ver los datos originales que se pueden editar.

- **Método:** `GET`
- **URL:** `/tasks/raw`

**Ejemplo con cURL:**

```bash
curl http://localhost:8080/tasks/raw
```

### 3. Crear una nueva tarea

Registra una nueva tarea. Puedes proporcionar la fecha de vencimiento directamente (`dueDate`) o calcularla a partir de los días hasta el vencimiento (`daysToDueDate`).

- **Método:** `POST`
- **URL:** `/tasks`
- **Body (JSON):**

  ```json
  {
    "description": "Mi nueva tarea",
    "startDate": "2025-11-10",
    "daysToDueDate": 15
  }
  ```

**Ejemplo con cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"description\":\"Mi nueva tarea\", \"startDate\":\"2025-11-10\", \"daysToDueDate\": 15}" http://localhost:8080/tasks
```

### 3. Actualizar una tarea existente

Modifica los datos de una tarea existente identificada por su `id`.

- **Método:** `PUT`
- **URL:** `/tasks/{id}`

**Ejemplo con cURL (actualizando la tarea con ID 1):**

```bash
curl -X PUT -H "Content-Type: application/json" -d "{\"description\":\"Descripción actualizada\", \"startDate\":\"2025-11-05\", \"dueDate\":\"2025-11-25\"}" http://localhost:8080/tasks/1
```

### 4. Eliminar una tarea

Elimina una tarea de la base de datos por su `id`.

- **Método:** `DELETE`
- **URL:** `/tasks/{id}`

**Ejemplo con cURL (eliminando la tarea con ID 2):**

```bash
curl -X DELETE http://localhost:8080/tasks/2
```

Si la operación es exitosa, la API devolverá un código de estado `204 No Content`.
