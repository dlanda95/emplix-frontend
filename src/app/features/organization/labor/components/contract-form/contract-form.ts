import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomButton } from '@shared/components/custom-button/custom-button';
import { ContractType } from '../../../../../core/services/labor.service';

@Component({
  selector: 'app-contract-form',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, 
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, CustomButton],
  templateUrl: './contract-form.html',
  styleUrl: './contract-form.scss',
})
export class ContractForm implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContractForm>,
    @Inject(MAT_DIALOG_DATA) public data: { contract?: ContractType }
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: [''], // Opcional, para códigos internos SUNAT
      hasBenefits: [true], // Default: Sí tiene beneficios
      isLaboral: [true]    // Default: Sí es laboral
    });
  }

  ngOnInit(): void {
    if (this.data.contract) {
      this.form.patchValue(this.data.contract);
    }
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() { this.dialogRef.close(); }
}