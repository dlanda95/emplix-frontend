import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateEntityDto } from '../../services/organization.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-position-form',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,MatSelectModule],
  templateUrl: './position-form.html',
  styleUrl: './position-form.scss',
})
export class PositionForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PositionForm>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [data?.description || ''],
      departmentId: [data.position?.departmentId || null] // <--- Campo nuevo
    });
  }
onCancel() { this.dialogRef.close(); }
  onSave() { if (this.form.valid) this.dialogRef.close(this.form.value); }
}


