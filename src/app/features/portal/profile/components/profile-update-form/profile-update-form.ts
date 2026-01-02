import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// UI Components
import { ModalUpdate } from '../ui/modal-update/modal-update';
import { CustomButton } from '@shared/components/custom-button/custom-button';
import { CustomInput } from '@shared/components/custom-input/custom-input';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-profile-update-form',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule, ModalUpdate,CustomInput, CustomButton],
  templateUrl: './profile-update-form.html',
  styleUrl: './profile-update-form.scss',
})
export class ProfileUpdateForm implements OnInit {
 private fb = inject(FormBuilder);
  form!: FormGroup;
  loading = false;

constructor(
    public dialogRef: MatDialogRef<ProfileUpdateForm>,
    @Inject(MAT_DIALOG_DATA) public data: { currentData: any } // Recibimos datos aquí
  ) {}


  ngOnInit() {

    const current = this.data.currentData || {};
  this.form = this.fb.group({
      firstName: [current.firstName || '', [Validators.required]],
      middleName: [current.middleName || ''],
      lastName: [current.lastName || '', [Validators.required]],
      secondLastName: [current.secondLastName || ''],
      birthDate: [this.formatDate(current.birthDate) || '', [Validators.required]],
      personalEmail: [current.personalEmail || '', [Validators.email]],
      phone: [current.phone || ''],
      address: [current.address || ''],
      emergencyName: [current.emergencyName || ''],
      emergencyPhone: [current.emergencyPhone || '']
    });
  }

 getControl(name: string) { return this.form.get(name) as any; }

 onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      // Simulamos pequeña espera o enviamos directo
      setTimeout(() => {
        this.loading = false;
        // Cerramos el modal y devolvemos los datos del formulario
        this.dialogRef.close(this.form.value); 
      }, 500);
    }
  }



 close() {
    this.dialogRef.close(null); // Cierra sin devolver datos
  }

  private formatDate(dateString: string | null): string {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  }
}