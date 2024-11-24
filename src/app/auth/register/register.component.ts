import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializar el formulario
    this.registerForm = this.fb.group({
      nombre_usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { nombre_usuario, contrasena, rol } = this.registerForm.value;
      this.authService.register({ nombre_usuario, contrasena, rol }).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/login']); // Redirige al login
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.errorMessage = 'Error en el registro. Inténtalo de nuevo.';
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
