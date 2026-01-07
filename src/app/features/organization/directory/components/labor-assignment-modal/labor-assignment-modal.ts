import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import { CustomButton } from '@shared/components/custom-button/custom-button';
import { EmployeesService } from '@core/services/employees.service';
import { LaborService } from '../../../../../core/services/labor.service'; // Tu nuevo servicio
import { OrganizationService } from '../../../../../core/services/organization.service';

@Component({
  selector: 'app-labor-assignment-modal',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatInputModule,
    CustomButton],
  templateUrl: './labor-assignment-modal.html',
  styleUrl: './labor-assignment-modal.scss',
})
export class LaborAssignmentModal implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeesService);
  private laborService = inject(LaborService);
  private orgService = inject(OrganizationService);
  
  form: FormGroup;
  
  // Listas desplegables (Legos)
  shifts$ = this.laborService.getShifts();
  contracts$ = this.laborService.getContracts();
  departments$ = this.orgService.getDepartments();
  positions$ = this.orgService.getPositions();

  constructor(
    private dialogRef: MatDialogRef<LaborAssignmentModal>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: any }
  ) {
    this.form = this.fb.group({
      departmentId: [null],
      positionId: [null],
      contractType: [null, Validators.required], // ID del contrato
      workShiftId: [null, Validators.required],  // ID del turno
      startDate: [new Date(), Validators.required],
      salary: [0, [Validators.min(0)]]
    });
  }

  ngOnInit() {
    if (this.data.employee) {
      const emp = this.data.employee;
      // Cargar datos actuales
      this.form.patchValue({
        departmentId: emp.department?.id,
        positionId: emp.position?.id,
        // Asumiendo que el backend trae laborData populated
        contractType: emp.laborData?.contractTypeId,
        workShiftId: emp.laborData?.workShiftId,
        startDate: emp.laborData?.startDate,
        salary: emp.laborData?.salary
      });
    }
  }

  submit() {
    if (this.form.valid) {
      this.employeeService.assignAdministrativeData(
        this.data.employee.id, 
        this.form.value
      ).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err) // Manejar con Toast idealmente
      });
    }
  }

  close() { this.dialogRef.close(); }
}