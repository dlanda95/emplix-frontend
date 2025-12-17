import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizationService } from '../../../structure/services/organization.service';
import { Department, Position } from '../../../../../core/models/organization.model';
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-positions-manager',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatListModule, MatTooltipModule],
  templateUrl: './cargos-manager.html',
  styleUrl: './cargos-manager.scss',
})
export class PositionsManager implements OnInit {
  positions: Position[] = [];
  form: FormGroup;
  loading = false;

  private service = inject(OrganizationService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  public dialogRef = inject(MatDialogRef<PositionsManager>);

  constructor(@Inject(MAT_DIALOG_DATA) public department: Department) {
    // Formulario simple para crear cargo
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      departmentId: [this.department.id] // Vinculado automáticamente al área
    });
  }

  ngOnInit() {
    this.loadPositions();
  }

  loadPositions() {
    this.loading = true;
    this.service.getPositions(this.department.id).subscribe({
      next: (data) => {
        this.positions = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  addPosition() {
    if (this.form.invalid) return;

    this.loading = true;
    this.service.createPosition(this.form.value).subscribe({
      next: (newPos) => {
        this.toast.success('Cargo agregado');
        this.positions.push(newPos); // Agregamos a la lista visualmente
        this.form.reset({ departmentId: this.department.id }); // Limpiamos form
        this.loading = false;
      },
      error: (err) => {
        this.toast.error(err.error.message || 'Error al crear cargo');
        this.loading = false;
      }
    });
  }

  deletePosition(pos: Position) {
    if (!confirm(`¿Eliminar el cargo "${pos.name}"?`)) return;

    this.service.deletePosition(pos.id).subscribe({
      next: () => {
        this.toast.success('Cargo eliminado');
        this.positions = this.positions.filter(p => p.id !== pos.id);
      },
      error: (err) => this.toast.error(err.error.message || 'No se puede eliminar (¿Tiene empleados?)')
    });
  }
}