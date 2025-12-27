import { Component, inject, OnInit } from '@angular/core'; // <--- Agregar OnInit
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { CustomButton } from '../../../shared/components/custom-button/custom-button';
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { MsalService } from '@azure/msal-angular';

// 1. IMPORTAR EL TENANT SERVICE
import { TenantService } from '../../../core/services/tenant.service';

@Component({
  selector: 'app-login',
  standalone: true, // Asumo que es standalone por los imports
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule,
    RouterModule,
    CustomInput,
    CustomButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit { // <--- Implementar OnInit
  private msalService = inject(MsalService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  
  // 2. INYECTAR SERVICIO
  private tenantService = inject(TenantService);

  isLoading = false;
  errorMessage = '';

  // 3. AGREGAR CAMPO TENANT AL FORMULARIO
  loginForm: FormGroup = this.fb.group({
    tenant: ['', [Validators.required, Validators.minLength(3)]], // <--- NUEVO
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit() {
    // A. Cargar el valor actual (por si recargó la página o viene del environment)
    const currentTenant = this.tenantService.getTenant();
    
    // B. Setearlo en el input (sin emitir evento para no crear bucle infinito inicial)
    this.loginForm.get('tenant')?.setValue(currentTenant, { emitEvent: false });

    // C. ESCUCHAR CAMBIOS: Cada vez que el usuario escribe, actualizamos el servicio
    // Esto asegura que si da clic en "Login" o "Microsoft", el Interceptor ya tenga el valor nuevo.
    this.loginForm.get('tenant')?.valueChanges.subscribe((slug) => {
      if (slug) {
        // Convertimos a minúsculas y quitamos espacios para evitar errores de tipeo
        const cleanSlug = slug.toLowerCase().trim();
        this.tenantService.setTenant(cleanSlug);
      }
    });
  }

  getControl(name: string): FormControl {
    return this.loginForm.get(name) as FormControl;
  }

  async loginWithMicrosoft() {
    // Validar que haya empresa antes de intentar ir a Microsoft
    const tenantSlug = this.loginForm.get('tenant')?.value;
    if (!tenantSlug) {
      this.toast.error('Por favor, ingresa el código de la empresa primero.');
      return;
    }

    try {
      const result = await firstValueFrom(this.msalService.loginPopup({
        scopes: ['User.Read', 'openid', 'profile', 'email']
      }));

      if (result && result.idToken) {
        this.isLoading = true;
        
        // El Interceptor inyectará automáticamente el header x-tenant-slug
        // basado en lo que el usuario escribió en el input (gracias al valueChanges)
        this.authService.loginMicrosoft(result.idToken).subscribe({
          next: () => {
            this.isLoading = false;
            this.toast.success('Bienvenido');
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Error Backend:', err);
            this.isLoading = false;
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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Para mostrar errores rojos si faltan campos
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    // Aquí no necesitamos pasar el tenant manualmente,
    // el Interceptor lo leerá del TenantService.
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        // La redirección se hace en el service o aquí:
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error en Login:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas o empresa equivocada.';
        } else if (error.status === 404) {
           // Opcional: Manejar si el tenant no existe (devuelve 404 desde el middleware)
           this.errorMessage = 'La empresa ingresada no existe.';
        } else if (error.status === 0) {
          this.errorMessage = 'No hay conexión con el servidor.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado.';
        }
      }
    });
  }
}