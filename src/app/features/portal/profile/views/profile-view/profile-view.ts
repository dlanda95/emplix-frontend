


import { Component, OnInit, inject, ViewEncapsulation, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ProfileHeader } from '../../components/profile-header/profile-header';
import { InfoSection, InfoField } from '../../components/info-section/info-section';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// IMPORTAMOS EL COMPONENTE (Angular lo separará en un chunk automáticamente gracias a @defer)
// No necesitamos importar ModalUpdateComponent aquí, porque ya vive DENTRO del formulario
import { ProfileUpdateForm } from '../../components/profile-update-form/profile-update-form';

import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { AuthService } from '@core/auth/auth.service';
import { ToastService } from '@core/services/toast.service';
import { RequestService } from '../../../../../core/services/request.service'; // <--- IMPORTAR
import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
// 👇 Importamos modelo y servicio
import { EmployeesService } from '@core/services/employees.service';
import { Employee } from '@core/models/employee.model';

import { CustomButton } from '@shared/components/custom-button/custom-button';

@Component({
   standalone: true,
  selector: 'app-profile',
  imports: [ CommonModule, 
    MatButtonModule, 
    MatIconModule,
    ProfileHeader, 
    InfoSection,CustomButton,
    MatProgressSpinnerModule,ContentLayoutView
    ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})
export class ProfileView implements OnInit {
 private dialog = inject(MatDialog); // 👈 INYECTAMOS DIALOG
  private toast = inject(ToastService);
  private requestService = inject(RequestService);
  private employeesService = inject(EmployeesService);


 profileData: Employee | null = null;
  
  // Variables mapeadas para la vista
  personalData: any[] = [];
  jobData: any[] = [];
  emergencyData: any[] = [];
  
  isUploadingPhoto = false;

// Getter simplificado
 get fullName(): string {
    if (!this.profileData) return 'Usuario';
    const emp = this.profileData;
    return [emp.firstName, emp.lastName, emp.secondLastName].filter(Boolean).join(' ');
  }

  ngOnInit() {
    this.loadProfile();
  }

 loadProfile() {
    this.employeesService.getMyProfile().subscribe({
      next: (data) => {
        // ✅ CORRECTO: Asignamos directo. 'data' ya es de tipo Employee.
        this.profileData = data; 
        this.mapData();
      },
      error: (err) => console.error('Error cargando perfil:', err)
    });
  };


openUpdateModal() {
    if (!this.profileData) return;

    const dialogRef = this.dialog.open(ProfileUpdateForm, {
      width: '640px',          // Ancho cómodo
      maxWidth: '95vw',        // No pasarse en móvil
      maxHeight: '90vh',       // Altura máxima para que siempre quepa
      panelClass: 'aesthetic-dialog', // Clase opcional para quitar paddings nativos
      disableClose: true,      // Evita cierre accidental
      data: { 
        currentData: this.profileData // Pasamos los datos
      }
    });

    dialogRef.afterClosed().subscribe(formData => {
      // Si formData tiene valor, es que el usuario pulsó "Enviar"
      if (formData) {
        this.handleEditRequest(formData);
      }
    });
  }


// cambios requests
handleEditRequest(formData: any) {
    const payload = {
      type: 'PROFILE_UPDATE' as const,
      reason: 'Actualización de datos personales',
      data: formData
    };

    this.requestService.createRequest(payload).subscribe({
      next: () => this.toast.success('✅ Solicitud enviada a RRHH.'),
      error: () => this.toast.error('❌ Error al enviar solicitud.')
    });
  }

 mapData() {
    // Si no hay datos, salimos
    if (!this.profileData) return;
    
    const emp = this.profileData; // Alias corto para escribir menos
    
    const formattedBirthDate = emp.birthDate 
      ? new Date(emp.birthDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'No registrada';

    this.personalData = [
      { label: 'Email Personal', value: emp.personalEmail || '-', icon: 'mail' },
      { label: 'Teléfono', value: emp.phone || '-', icon: 'call' },
      { label: 'Domicilio', value: emp.address || '-', icon: 'home' },
      { label: 'Fecha Nacimiento', value: formattedBirthDate, icon: 'cake' }
    ];

    this.jobData = [
      { label: 'Departamento', value: emp.department?.name || '-' },
      { label: 'Cargo', value: emp.position?.name || '-' },
      { label: 'Fecha Ingreso', value: emp.hireDate ? new Date(emp.hireDate).toLocaleDateString() : '-', icon: 'event' }
    ];

    this.emergencyData = [
      { label: 'Contacto', value: emp.emergencyName || '-', icon: 'person_alert' },
      { label: 'Teléfono Emergencia', value: emp.emergencyPhone || '-', icon: 'phone_callback', isLink: true }
    ];
  }





onUpdateAvatar(file: File) {
    if (!this.profileData?.id) return;

    this.isUploadingPhoto = true;

    this.employeesService.uploadAvatar(this.profileData.id, file).subscribe({
      next: (res) => {
        if (this.profileData) {
          // Truco del timestamp para evitar caché del navegador
          const timestamp = new Date().getTime();
          this.profileData.photoUrl = `${res.document.photoUrl}?t=${timestamp}`;
        }

        this.isUploadingPhoto = false;
        
        // 👇 USAR TOAST EN LUGAR DE SNACKBAR
        this.toast.success('¡Foto de perfil actualizada!'); 
      },
      error: (err) => {
        console.error('Error subiendo avatar:', err);
        this.isUploadingPhoto = false;
        
        // 👇 USAR TOAST EN LUGAR DE SNACKBAR
        this.toast.error('No se pudo subir la imagen.');
      }
    });
  }

}