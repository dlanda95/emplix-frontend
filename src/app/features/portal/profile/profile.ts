import { Component, OnInit, inject, ViewEncapsulation, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AuthService } from './../../../core/auth/auth.service';
import { ProfileHeader } from './profile-header/profile-header';
import { InfoSection, InfoField } from './info-section/info-section';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


// IMPORTAMOS EL COMPONENTE (Angular lo separará en un chunk automáticamente gracias a @defer)
// No necesitamos importar ModalUpdateComponent aquí, porque ya vive DENTRO del formulario
import { ProfileUpdateForm } from './components/profile-update-form/profile-update-form';




@Component({
   standalone: true,
  selector: 'app-profile',
  imports: [ CommonModule, 
    MatButtonModule, 
    MatIconModule,
    ProfileHeader, 
    InfoSection,
    ProfileUpdateForm
    ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private authService = inject(AuthService);
  
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
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.mapData();
      },
      error: (err) => console.error(err)
    });
  }

  handleEditRequest(payload: any) {
    console.log('📦 Solicitud enviada:', payload);
    // Aquí conectarás con el Backend (POST /api/requests)
    this.shouldShowModal = false;
    alert('✅ Solicitud enviada a RRHH.');
  }

  mapData() {
    const emp = this.profileData.employee || {};
    const formattedBirthDate = emp.dateOfBirth 
      ? new Date(emp.dateOfBirth).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
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
}