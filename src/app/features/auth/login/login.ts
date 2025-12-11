import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { Router, RouterModule } from '@angular/router'; // 1. Importar Router
import { firstValueFrom } from 'rxjs'; // 2. Importar utilitario para Promesas
// 1. Importamos tus Componentes Reutilizables (Lego)
// Asegúrate de que estas rutas coincidan con tu estructura final
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';

// 2. Importamos el Servicio de Autenticación Real (Conecta con Backend)
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service'; // 3. Importar ToastService
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

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
  private msalService = inject(MsalService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);      // <--- FALTABA ESTO
  private toast = inject(ToastService); // <--- FALTABA ESTO

  isLoading = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  getControl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }



  // --- LOGIN CON MICROSOFT ---
  async loginWithMicrosoft() {
    try {
      // Usamos firstValueFrom en lugar de toPromise (estándar moderno)
      // y dejamos que TS infiera el tipo para evitar conflictos con 'undefined'
      const result = await firstValueFrom(this.msalService.loginPopup({
        scopes: ['User.Read', 'openid', 'profile', 'email']
      }));

      // Validación de seguridad
      if (result && result.idToken) {
        this.isLoading = true; // Feedback visual
        
        this.authService.loginMicrosoft(result.idToken).subscribe({
          next: () => {
            this.isLoading = false;
            this.toast.success('Bienvenido');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error Backend:', err);
            this.isLoading = false;
            // Mostramos el mensaje real del backend si existe
            const msg = err.error?.message || 'Error al validar con el servidor';
            this.toast.error(msg);
          }
        });
      }
    } catch (error) {
      console.error('Error MSAL:', error);
      this.isLoading = false;
      this.toast.error('No se pudo iniciar sesión con Microsoft');
    }
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