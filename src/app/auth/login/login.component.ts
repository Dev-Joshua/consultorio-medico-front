import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre_usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']); // Redirige a la página principal
      },
      error: (err) => {
        console.error('Error en el login:', err);
        alert('Usuario o contraseña incorrectos');
      },
    });
  }
}
