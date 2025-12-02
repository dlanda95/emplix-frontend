import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

// 1. CORRECCIÓN DE RUTAS: Usamos 3 niveles (../../../) para llegar a 'src/app/'
import { CustomInput } from '../../../shared/components/custom-input/custom-input';
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
// 2. SERVICIO DE AUTENTICACIÓN
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    CustomInput,
    CustomButton],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

 private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep = 1; 
  isLoading = false;
  userExistsError = false;
  registrationSuccess = false;
  errorMessage = '';

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  onSubmit() {
    if (this.currentStep === 1) {
      this.handleStepOne();
    } else {
      this.handleStepTwo();
    }
  }

  handleStepOne() {
    const emailControl = this.getControl('email');
    if (emailControl.invalid) {
      emailControl.markAsTouched();
      return;
    }

    this.isLoading = true;
    const email = emailControl.value;

    this.authService.checkEmailAvailability(email).subscribe({
      next: (exists) => {
        this.isLoading = false;
        if (exists) {
          this.userExistsError = true;
        } else {
          this.currentStep = 2;
          emailControl.disable(); 
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = 'Error al verificar email.';
      }
    });
  }

  handleStepTwo() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const formData = this.registerForm.getRawValue();

    this.authService.register(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.registrationSuccess = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ocurrió un error al registrar.';
      }
    });
  }

  isButtonDisabled(): boolean {
    if (this.isLoading) return true;
    if (this.currentStep === 1) {
      return this.getControl('email').invalid && this.getControl('email').touched;
    }
    return this.registerForm.invalid;
  }

  // --- LÓGICA DE CAMBIO DE CORREO ---
  changeEmail() {
    this.currentStep = 1;
    const emailControl = this.getControl('email');
    emailControl.enable();          // Habilitamos para editar
    emailControl.setValue('');      // Limpiamos el valor anterior
    emailControl.markAsUntouched(); // Reseteamos validación visual
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToLoginWithEmail() {
    this.router.navigate(['/login'], { queryParams: { email: this.getControl('email').value } });
  }

  resetForm() {
    this.userExistsError = false;
    this.changeEmail(); // Reutilizamos la lógica de limpiar
  }
}


