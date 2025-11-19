import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Tasks } from './components/tasks/tasks';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'tasks', component: Tasks, canActivate: [authGuard] }
];
