import { Component, Input } from '@angular/core';
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

@Input() label: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'date' = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = ''; 
  @Input() control!: FormControl; 

  hidePassword = true;

  get inputType() {
    return this.type === 'password' ? (this.hidePassword ? 'password' : 'text') : this.type;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onBlur() {
    this.control.markAsTouched();
  }
}
