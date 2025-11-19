export interface Task {
    id: number;
    description: string;
    startDate: string; // Represented as ISO string (e.g., "YYYY-MM-DD")
    dueDate: string;   // Represented as ISO string (e.g., "YYYY-MM-DD")
}

export interface TaskRequest {
    description: string;
    startDate: string;
    dueDate: string;
}
