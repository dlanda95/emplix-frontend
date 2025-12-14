import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


// Componentes
import { DocFolderCard } from '../../components/doc-folder-card/doc-folder-card';
import { DocList} from '../../components/doc-list/doc-list'; // (Te lo paso si te gusta la idea)

@Component({
  selector: 'app-documents-view',
  imports: [CommonModule, MatButtonModule, MatIconModule, DocFolderCard, DocList],
  templateUrl: './documents-view.html',
  styleUrl: './documents-view.scss',
})
export class DocumentsView {

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

  applyFilter(event: Event) {
    // Lógica futura de filtrado

    const term = (event.target as HTMLInputElement).value;
    console.log('Filtrando documentos por:', term);
  }

}
