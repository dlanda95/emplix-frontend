import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // 👈 El Toggle clave
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomButton } from '@shared/components/custom-button/custom-button';
import { WorkShift } from '../../../../../core/services/labor.service';
@Component({
  selector: 'app-shift-form',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, 
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, 
    MatCheckboxModule, CustomButton],
  templateUrl: './shift-form.html',
  styleUrl: './shift-form.scss',
})
export class ShiftForm implements OnInit {
  form: FormGroup;
  isFiscalized = true; // Estado para controlar la vista

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShiftForm>,
    @Inject(MAT_DIALOG_DATA) public data: { shift?: WorkShift }
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      isFiscalized: [true],
      startTime: ['09:00'], 
      endTime: ['18:00'],
      breakTime: [60, [Validators.min(0)]],
      tolerance: [5, [Validators.min(0)]],
      allowsOvertime: [false]
    });
  }

  ngOnInit(): void {
    // Detectar cambios en el toggle para validaciones dinámicas
    this.form.get('isFiscalized')?.valueChanges.subscribe(val => {
      this.isFiscalized = val;
      this.updateValidators();
    });

    if (this.data.shift) {
      this.form.patchValue(this.data.shift);
      this.isFiscalized = this.data.shift.isFiscalized;
    }
    
    this.updateValidators(); // Inicializar estado
  }

  // Si no es fiscalizado, no obligamos a poner hora
  updateValidators() {
    const timeControls = ['startTime', 'endTime'];
    if (this.isFiscalized) {
      timeControls.forEach(c => this.form.get(c)?.setValidators(Validators.required));
    } else {
      timeControls.forEach(c => this.form.get(c)?.clearValidators());
    }
    timeControls.forEach(c => this.form.get(c)?.updateValueAndValidity());
  }

  submit() {
    if (this.form.valid) {
      // Limpieza de datos: Si no es fiscalizado, mandamos null en horas
      const payload = this.form.value;
      if (!payload.isFiscalized) {
        payload.startTime = null;
        payload.endTime = null;
        payload.tolerance = 0;
      }
      this.dialogRef.close(payload);
    }
  }

  close() { this.dialogRef.close(); }
}