import { Component, input,signal,computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-custom-input',
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
})
export class CustomInput {
// --- SIGNALS (Inputs) ---
  label = input(''); 
  placeholder = input('');
  icon = input(''); // Icono opcional (ej: 'email', 'lock')
  
  // Tipos soportados
  type = input<'text' | 'password' | 'email' | 'date' | 'number'>('text');
  
  // Control es requerido para que funcione la magia de los errores
  control = input.required<FormControl>(); 

  // --- ESTADO INTERNO ---
  hidePassword = signal(true);

  // Computed: Reacciona automáticamente a cambios en 'type' o 'hidePassword'
  inputType = computed(() => {
    if (this.type() === 'password') {
      return this.hidePassword() ? 'password' : 'text';
    }
    return this.type();
  });

  togglePasswordVisibility() {
    this.hidePassword.update(val => !val);
  }

  onBlur() {
    this.control().markAsTouched();
  }
}
