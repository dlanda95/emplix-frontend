import { Component, Input , Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // Agregué esto por si usas el tooltip


import { AvatarSelector } from '../../../../../shared/components/avatar-selector/avatar-selector';


@Component({
  selector: 'app-profile-header',
  standalone: true, // Asumo que es standalone por el código anterior
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule,AvatarSelector],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {@Input() fullName: string = '';
  @Input() jobTitle: string = '';
  @Input() location: string = '';
  @Input() photoUrl: string | null = null;
  @Input() isLoadingPhoto: boolean = false; // Estado de carga desde el padre

  // Emitimos el evento hacia arriba (la página principal se encargará de llamar al servicio)
  @Output() photoChange = new EventEmitter<File>(); 

  onAvatarSelected(file: File) {
    this.photoChange.emit(file);
  }
}