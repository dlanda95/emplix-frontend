import { Component, Inject, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';


// Interfaces (Idealmente en models separados)
interface DialogData {
  employee: any;
  departments: any[];
  positions: any[];
  supervisors: any[]; // Lista de posibles jefes
}

@Component({
  selector: 'app-employee-assign-form',
  imports: [CommonModule, MatIcon,ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './employee-assign-form.html',
  styleUrl: './employee-assign-form.scss',
})
export class EmployeeAssignForm implements OnInit{form: FormGroup;
  filteredPositions: any[] = []; // Aquí guardamos los cargos filtrados
  
  private destroyRef = inject(DestroyRef); // Para cancelar suscripción automáticamente

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

  ngOnInit() {
    // 1. Filtrado inicial (si ya viene con un dpto, mostrar sus cargos)
    this.updatePositionsList(this.form.get('departmentId')?.value);

    // 2. Escuchar cambios en el selector de Departamento
    this.form.get('departmentId')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((deptId) => {
        this.updatePositionsList(deptId);
        
        // Importante: Resetear el cargo al cambiar de área para evitar inconsistencias
        this.form.get('positionId')?.setValue(null);
      });
  }

  updatePositionsList(departmentId: string | null) {
    if (!departmentId) {
      // Si no selecciona área, mostramos cargos "Generales" (sin departmentId) o vaciamos
      this.filteredPositions = this.data.positions.filter(p => !p.departmentId);
    } else {
      // Filtramos: Cargos que pertenecen a ese ID + Cargos Generales (opcional)
      this.filteredPositions = this.data.positions.filter(p => 
        p.departmentId === departmentId || !p.departmentId
      );
    }
  }

  close() { this.dialogRef.close(); }
  save() { this.dialogRef.close(this.form.value); }
}