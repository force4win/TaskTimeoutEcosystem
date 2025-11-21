import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // Importar ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Task, TaskRequest } from '../../models/task.models';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  taskService = inject(TaskService);
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef); // Inyectar ChangeDetectorRef

  taskForm: FormGroup;
  editingTask: Task | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor() {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private setFeedbackMessage(type: 'success' | 'error', message: string): void {
    if (type === 'success') {
      this.successMessage = message;
      this.errorMessage = null;
    } else {
      this.errorMessage = message;
      this.successMessage = null;
    }
    this.cdr.detectChanges(); // Detectar cambios para el feedback
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
      this.cdr.detectChanges(); // Detectar cambios al limpiar el feedback
    }, 5000);
  }

  loadTasks(): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.taskService.getTasks().subscribe({
      next: (data) => {
        debugger;
        this.tasks = data;
        if (data.length === 0) {
          this.setFeedbackMessage('success', 'No hay tareas disponibles. ¡Crea una nueva!');
        }
        this.cdr.detectChanges(); // Disparar change detection
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load tasks', err);
        this.setFeedbackMessage('error', `Error al cargar tareas: ${err.message}`);
        if (err.status === 401 || err.status === 403) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        this.cdr.detectChanges(); // Disparar change detection
      }
    });
  }

  createOrUpdateTask(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.taskForm.valid) {
      const taskData: TaskRequest = this.taskForm.value;
      if (this.editingTask) {
        // Actualizar tarea existente
        this.taskService.updateTask(this.editingTask.id, taskData).subscribe({
          next: (updatedTask) => {
            const index = this.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
            this.cancelEdit();
            this.setFeedbackMessage('success', `Tarea "${updatedTask.description}" actualizada con éxito.`);
            this.cdr.detectChanges(); // Disparar change detection
          },
          error: (err: HttpErrorResponse) => {
            console.error('Failed to update task', err);
            this.setFeedbackMessage('error', `Error al actualizar tarea: ${err.message}`);
          }
        });
      } else {
        // Crear nueva tarea
        this.taskService.createTask(taskData).subscribe({
          next: (createdTask) => {
            this.tasks.push(createdTask);
            this.taskForm.reset();
            this.setFeedbackMessage('success', `Tarea "${createdTask.description}" creada con éxito.`);
            this.cdr.detectChanges(); // Disparar change detection
          },
          error: (err: HttpErrorResponse) => {
            console.error('Failed to create task', err);
            this.setFeedbackMessage('error', `Error al crear tarea: ${err.message}`);
          }
        });
      }
    }
  }

  editTask(task: Task): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.editingTask = task;
    this.taskForm.patchValue({
      description: task.description,
      startDate: task.startDate,
      dueDate: task.dueDate
    });
  }

  cancelEdit(): void {
    this.editingTask = null;
    this.taskForm.reset();
    this.successMessage = null;
    this.errorMessage = null;
  }

  deleteTask(id: number): void {
    this.successMessage = null;
    this.errorMessage = null;
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
          if (this.editingTask?.id === id) {
            this.cancelEdit();
          }
          this.setFeedbackMessage('success', 'Tarea eliminada con éxito.');
          this.cdr.detectChanges(); // Disparar change detection
        },
        error: (err: HttpErrorResponse) => {
          console.error('Failed to delete task', err);
          this.setFeedbackMessage('error', `Error al eliminar tarea: ${err.message}`);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
