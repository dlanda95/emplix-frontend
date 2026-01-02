import { Component, inject,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



// ... imports
import { CustomSearchInput } from '@shared/components/custom-search-input/custom-search-input'; // 👈 IMPORTAR

import { MatDialog } from '@angular/material/dialog';
import { DocUploadModal } from '../../components/doc-upload-modal/doc-upload-modal'; // Importar componente
// Componentes
import { DocFolderCard } from '../../components/doc-folder-card/doc-folder-card';
import { DocList} from '../../components/doc-list/doc-list'; // (Te lo paso si te gusta la idea)
import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';
@Component({
  selector: 'app-documents-view',
  imports: [CommonModule,CustomSearchInput, MatButtonModule, MatIconModule, ContentLayoutView,DocFolderCard, DocList],
  templateUrl: './documents-view.html',
  styleUrl: './documents-view.scss',
})
export class DocumentsView {
  private dialog = inject(MatDialog);

  selectedCategory = signal<string | null>(null);

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  clearSelection() {
    this.selectedCategory.set(null);
  }

  getCategoryTitle(cat: string | null): string {
    const map: any = {
      'PAYSLIPS': 'Boletas de Pago',
      'CONTRACTS': 'Contratos y Documentos Legales',
      'POLICIES': 'Políticas Institucionales',
      'UPLOADS': 'Mis Documentos Subidos'
    };
    return map[cat!] || 'Documentos';
  }

  applyFilter(term: string) { 
    console.log('Filtrando documentos por:', term);
    // Aquí iría tu lógica de filtrado real
  }


  openUploadModal() {
    const dialogRef = this.dialog.open(DocUploadModal, {
      width: '500px',
      panelClass: 'aesthetic-dialog' // Opcional, si tienes estilos globales para modales
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Archivo subido con éxito, recargando lista...');
        // Aquí podrías llamar a un método para recargar la lista de archivos
      }
    });
  }

}
