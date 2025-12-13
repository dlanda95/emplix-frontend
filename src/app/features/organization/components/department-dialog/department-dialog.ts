import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrganizationService } from '../../services/organization.service';
import { Department } from '../../../../core/models/organization.model';
import { ToastService } from '../../../../core/services/toast.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-department-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, 
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './department-dialog.html',
  styleUrl: './department-dialog.scss',
})
export class DepartmentDialog {

  form: FormGroup;
  isEdit = false;

  private fb = inject(FormBuilder);
  private service = inject(OrganizationService);
  private dialogRef = inject(MatDialogRef<DepartmentDialog>);
  private toast = inject(ToastService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Department | null) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      name: [data?.name || '', [Validators.required]],
      code: [data?.code || ''], // Campo opcional
      description: [data?.description || '']
    });
  }

  save() {
    if (this.form.invalid) return;

    const req = this.isEdit 
      ? this.service.updateDepartment(this.data!.id, this.form.value)
      : this.service.createDepartment(this.form.value);

    req.subscribe({
      next: () => {
        this.toast.success(this.isEdit ? 'Departamento actualizado' : 'Departamento creado');
        this.dialogRef.close(true); // Retorna true para indicar que se debe recargar
      },
      error: (err) => this.toast.error(err.error.message || 'Error al guardar')
    });
  }
}


  


