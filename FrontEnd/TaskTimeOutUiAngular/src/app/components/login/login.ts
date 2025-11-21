import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);

  login(): void {
    const credentials: LoginCredentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Login failed', err);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }
}
