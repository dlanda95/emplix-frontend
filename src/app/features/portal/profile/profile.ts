import { Component, OnInit,inject,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../../core/auth/auth.service';
import { ProfileHeader } from './profile-header/profile-header';
import { InfoSection, InfoField } from './info-section/info-section';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, ProfileHeader, InfoSection],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit{
  private authService = inject(AuthService);
  
  profileData: any = null; // Guardamos toda la respuesta cruda
  
  // Arrays para los Legos
  personalData: InfoField[] = [];
  jobData: InfoField[] = [];
  legalData: InfoField[] = [];

  get fullName(): string {
    if (!this.profileData?.employee) return 'Usuario Nuevo';
    return `${this.profileData.employee.firstName} ${this.profileData.employee.lastName}`;
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.mapDataToLego(data);
      },
      error: (err) => console.error('Error cargando perfil:', err)
    });
  }

  // Transformamos la data del backend al formato que entienden tus tarjetas
  mapDataToLego(data: any) {
    const emp = data.employee || {};

    this.personalData = [
      { label: 'Email Corporativo', value: data.email, icon: 'email' },
      { label: 'Email Personal', value: emp.personalEmail || '-', icon: 'mail_outline' },
      { label: 'Teléfono', value: emp.phone || '-', icon: 'call' },
      { label: 'Domicilio', value: emp.address || '-', icon: 'home' },
    ];

    this.jobData = [
      { label: 'Departamento', value: emp.department?.name || '-' },
      { label: 'Jefe Directo', value: emp.supervisor ? `${emp.supervisor.firstName} ${emp.supervisor.lastName}` : '-' },
      { label: 'Fecha Ingreso', value: emp.hireDate ? new Date(emp.hireDate).toLocaleDateString() : '-', icon: 'event' },
      { label: 'Tipo Contrato', value: emp.contractType || '-' },
    ];

    this.legalData = [
      { label: 'Documento ID', value: emp.documentId || '-' },
      { label: 'Estado', value: emp.status || 'Activo' },
      // Aquí podrías agregar más campos si estuvieran en tu BD
    ];
  }
}

