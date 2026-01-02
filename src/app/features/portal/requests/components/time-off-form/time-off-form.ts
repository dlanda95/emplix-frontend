import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

import { CustomButton } from '@shared/components/custom-button/custom-button'; // 👈 IMPORTAR

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-time-off-form',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, MatIcon,
    MatButtonModule,
    MatDatepickerModule,CustomButton],
  templateUrl: './time-off-form.html',
  styleUrl: './time-off-form.scss',
})
export class TimeOffForm {form: FormGroup;
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TimeOffForm>,
    @Inject(MAT_DIALOG_DATA) public data: { label: string, description: string }
  ) {
    this.form = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Signal calculada para mostrar los días seleccionados en tiempo real
  daysCount = computed(() => {
    // Nota: En una app real usaríamos form.valueChanges con toSignal, 
    // pero para simplicidad lo calculamos al enviar o usaríamos un getter simple.
    // Aquí usaremos un getter tradicional por compatibilidad rápida:
    return this.calculateDays();
  });

  calculateDays(): number {
    const start = this.form.get('startDate')?.value;
    const end = this.form.get('endDate')?.value;
    if (start && end) {
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día final
    }
    return 0;
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}