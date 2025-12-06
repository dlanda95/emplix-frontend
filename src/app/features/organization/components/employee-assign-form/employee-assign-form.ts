import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


// Interfaces (Idealmente en models separados)
interface DialogData {
  employee: any;
  departments: any[];
  positions: any[];
  supervisors: any[]; // Lista de posibles jefes
}

@Component({
  selector: 'app-employee-assign-form',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './employee-assign-form.html',
  styleUrl: './employee-assign-form.scss',
})
export class EmployeeAssignForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeAssignForm>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.form = this.fb.group({
      departmentId: [data.employee.departmentId || null],
      positionId: [data.employee.positionId || null],
      supervisorId: [data.employee.supervisorId || null]
    });
  }

  close() { this.dialogRef.close(); }
  save() { this.dialogRef.close(this.form.value); }

}
