import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateDepartmentDto } from '../../services/organization.service';

@Component({
  selector: 'app-department-form',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.scss',
})
export class DepartmentForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentForm>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe datos si es edición
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [data?.description || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const result: CreateDepartmentDto = this.form.value;
      this.dialogRef.close(result);
    }
  }


}
