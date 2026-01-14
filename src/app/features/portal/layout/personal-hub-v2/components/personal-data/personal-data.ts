import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// TUS COMPONENTES LEGO
import { ContentBlock } from '@shared/components/ui/data-display/content-block/content-block';
import { DataGrid } from '@shared/components/ui/data-display/data-grid/data-grid';


import { DataField } from '@shared/components/ui/data-display/data-field/data-field';
import { CustomButton} from '@shared/components/custom-button/custom-button';
import { StatusBadge } from '@shared/components/ui/status-badge/status-badge';

@Component({
  selector: 'app-personal-data',
  imports: [CommonModule, ContentBlock, MatIconModule,DataGrid,DataField,CustomButton,StatusBadge],
  templateUrl: './personal-data.html',
  styleUrl: './personal-data.scss',
})
export class PersonalData {
  // Aquí cargarías datos reales desde un servicio
  employee = {
    firstName: 'Juan Carlos',
    lastName: 'Pérez Rodríguez',
    docType: 'DNI',
    docNumber: '44556677',
    birthDate: '15/04/1990',
    gender: 'Masculino',
    civilStatus: 'Casado',
    emailPersonal: 'juan.perez@gmail.com',
    phone: '+51 999 888 777',
    nationality: 'Peruana'
  };

}
