import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// 1. IMPORTAMOS EL MODAL AQUÍ (El hijo usa el marco)
import { ModalUpdate } from '../ui/modal-update/modal-update';

// Legos

// Importamos utilidades de Dialog
import { CustomButton } from '../../../../../shared/components/custom-button/custom-button';
import { CustomInput } from '../../../../../shared/components/custom-input/custom-input';
@Component({
  selector: 'app-profile-update-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, ModalUpdate,CustomInput, CustomButton],
  templateUrl: './profile-update-form.html',
  styleUrl: './profile-update-form.scss',
})
export class ProfileUpdateForm implements OnInit {
  @Input() currentData: any; 
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>(); // Evento para cerrar
  
  private fb = inject(FormBuilder);
  form!: FormGroup;
  loading = false;

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.currentData?.firstName || '', [Validators.required]],
      middleName: [this.currentData?.middleName || ''],
      lastName: [this.currentData?.lastName || '', [Validators.required]],
      secondLastName: [this.currentData?.secondLastName || ''],
      dateOfBirth: [this.formatDate(this.currentData?.dateOfBirth) || '', [Validators.required]],
      personalEmail: [this.currentData?.personalEmail || '', [Validators.email]],
      phone: [this.currentData?.phone || ''],
      address: [this.currentData?.address || ''],
      emergencyName: [this.currentData?.emergencyName || ''],
      emergencyPhone: [this.currentData?.emergencyPhone || '']
    });
  }

  getControl(name: string) { return this.form.get(name) as any; }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.save.emit(this.form.value);
      }, 800);
    }
  }

  close() {
    this.cancel.emit();
  }

  private formatDate(dateString: string | null): string {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  }
}