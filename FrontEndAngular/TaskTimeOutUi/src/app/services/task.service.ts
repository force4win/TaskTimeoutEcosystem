import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importar HttpHeaders
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskRequest } from '../models/task.models';
import { AuthService } from './auth.service'; // Importar AuthService

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private authService = inject(AuthService); // Inyectar AuthService
  private apiUrl = 'http://localhost:8081/api/tasktimeout';

  private getAuthHeaders(): HttpHeaders {

    debugger;
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { headers: this.getAuthHeaders() });
  }

  createTask(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task, { headers: this.getAuthHeaders() });
  }

  updateTask(id: number, task: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`, { headers: this.getAuthHeaders() });
  }
}
