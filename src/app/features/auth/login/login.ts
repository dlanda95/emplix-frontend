import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

// 1. Importamos tus Componentes Reutilizables (Lego)
// Asegúrate de que estas rutas coincidan con tu estructura final
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';

// 2. Importamos el Servicio de Autenticación Real (Conecta con Backend)
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatCardModule,
    RouterModule,
    CustomInput,
    CustomButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  getControl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        // La redirección al home se hace en el AuthService
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en Login:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Verifica tu correo o contraseña.';
        } else if (error.status === 0) {
          this.errorMessage = 'No hay conexión con el servidor.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      }
    }); }}