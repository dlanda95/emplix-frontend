


import { Component, OnInit, inject, ViewEncapsulation, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';

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
import { RequestService } from '../../../requests/services/request.service'; // <--- IMPORTAR
import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
// 👇 Importamos modelo y servicio
import { EmployeesService } from '@core/services/employees.service';
import { Employee } from '@core/models/employee.model';



@Component({
   standalone: true,
  selector: 'app-profile',
  imports: [ CommonModule, 
    MatButtonModule, 
    MatIconModule,
    ProfileHeader, 
    InfoSection,
    ProfileUpdateForm,
    MatProgressSpinnerModule,ContentLayoutView
    ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})
export class ProfileView implements OnInit {
  private toast = inject(ToastService);
  private authService = inject(AuthService);
  private requestService = inject(RequestService); // <--- INYECTAR
  private employeesService = inject(EmployeesService);
  private snackBar = inject(MatSnackBar);


  // 👇 NUEVA VARIABLE DE ESTADO
  isUploadingPhoto = false;
  
  profileData:Employee | null = null;
  
  // Controlamos la visualización con un simple booleano
  shouldShowModal = false;

  personalData: InfoField[] = [];
  jobData: InfoField[] = [];
  emergencyData: InfoField[] = [];

// Getter simplificado
  get fullName(): string {
    if (!this.profileData) return 'Usuario';
    const emp = this.profileData; // Acceso directo
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
  }



// cambios requests
handleEditRequest(formData: any) {
    // Construimos el payload según espera el Backend
    const payload = {
      type: 'PROFILE_UPDATE' as const,
      reason: 'Actualización de datos personales',
      data: formData // Aquí va el JSON con los campos (phone, address, etc.)
    };

    this.requestService.createRequest(payload).subscribe({
      next: () => {
        this.shouldShowModal = false;
        this.toast.success('✅ Solicitud enviada a RRHH para aprobación.');
      },
      error: (err) => {
        console.error(err);
        this.toast.error('❌ Error al enviar la solicitud.');
      }
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
    if (!this.profileData?.id) return; // Acceso directo al ID

    this.isUploadingPhoto = true;

    this.employeesService.uploadAvatar(this.profileData.id, file).subscribe({
      next: (res) => {
        if (this.profileData) {
          // Actualización directa de la propiedad en el modelo
          // Añadimos timestamp para romper caché del navegador
          const timestamp = new Date().getTime();
          this.profileData.photoUrl = `${res.document.photoUrl}?t=${timestamp}`;
        }

        this.isUploadingPhoto = false;
        this.snackBar.open('¡Foto de perfil actualizada!', 'Genial', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error subiendo avatar:', err);
        this.isUploadingPhoto = false;
        this.snackBar.open('No se pudo subir la imagen.', 'Cerrar');
      }
    });
  }

}