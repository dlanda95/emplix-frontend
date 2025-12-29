


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
import { EmployeesService } from '../../../../../core/services/employees.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { AuthService } from '../../../../../core/auth/auth.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { RequestService } from '../../../requests/services/request.service'; // <--- IMPORTAR
import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';

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
  
  profileData: any = null;
  
  // Controlamos la visualización con un simple booleano
  shouldShowModal = false;

  personalData: InfoField[] = [];
  jobData: InfoField[] = [];
  emergencyData: InfoField[] = [];

  get fullName(): string {
    if (!this.profileData?.employee) return 'Usuario';
    const emp = this.profileData.employee;
    return [emp.firstName, emp.middleName, emp.lastName, emp.secondLastName].filter(Boolean).join(' ');
  }

  ngOnInit() {
    this.loadProfile();
  }

 loadProfile() {
    // ANTES (ERROR): this.authService.getProfile().subscribe(...)
    // AHORA (CORRECTO): Llamamos a Employees, que sí trae la foto.
    this.employeesService.getMyProfile().subscribe({
      next: (data) => {
        
        // TRUCO DE MAPEO:
        // El EmployeesService devuelve el empleado DIRECTAMENTE (ej: { id: 1, photoUrl: '...' })
        // Pero tu HTML espera tenerlo dentro de una propiedad 'employee' (ej: profileData.employee)
        // Así que lo envolvemos para no romper tu HTML:
        
        this.profileData = {
          employee: data
        };

        this.mapData(); // Llenamos los datos de la vista
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
    const emp = this.profileData.employee || {};
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












  // 👇 NUEVA FUNCIÓN: CONECTA EL FRONTAL CON AZURE
  onUpdateAvatar(file: File) {
    if (!this.profileData?.employee?.id) return;

    this.isUploadingPhoto = true; // 1. Prende el spinner en el header

    this.employeesService.uploadAvatar(this.profileData.employee.id, file).subscribe({
      next: (res) => {
        // 2. Éxito: Actualizamos la foto en pantalla inmediatamente
        // Azure nos devuelve la nueva URL en la respuesta
        if (this.profileData.employee) {
          this.profileData.employee.photoUrl = res.document.photoUrl; 
          // OJO: Si angular no detecta el cambio, fuerza una copia del objeto:
          // this.profileData = { ...this.profileData };
        }

        this.isUploadingPhoto = false; // Apaga el spinner
        this.snackBar.open('¡Foto de perfil actualizada!', 'Genial', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error subiendo avatar:', err);
        this.isUploadingPhoto = false; // Apaga el spinner aunque falle
        this.snackBar.open('No se pudo subir la imagen. Intenta con una más ligera.', 'Cerrar');
      }
    });
}}