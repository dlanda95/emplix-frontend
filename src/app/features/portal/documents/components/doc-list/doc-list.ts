import { Component, Input, OnChanges, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DocumentService, DocFile } from '../../services/document.service';


@Component({
  selector: 'app-doc-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './doc-list.html',
  styleUrl: './doc-list.scss',
})
export class DocList implements OnChanges {
  @Input() @Input() category: string | null = '';
  
  private docService = inject(DocumentService);
  
  docs = signal<DocFile[]>([]);
  displayedColumns: string[] = ['icon', 'name', 'date', 'size', 'actions'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category'] && this.category) {
      this.loadDocs();
    }
  }

 loadDocs() {
    // VALIDACIÓN DE SEGURIDAD
    // Si la categoría es nula o vacía, no hacemos nada o limpiamos la lista
    if (!this.category) {
      this.docs.set([]); // Limpiamos la lista visualmente
      return; // Detenemos la ejecución
    }

    // Ahora TypeScript sabe que 'category' existe, pero para estar 100% seguros
    // le pasamos 'this.category!' o lo enviamos directo si ya validamos arriba.
    this.docService.getDocumentsByCategory(this.category).subscribe(data => {
      this.docs.set(data);
    });
  }

  downloadFile(doc: DocFile) {
    console.log('Descargando:', doc.name);
    // Aquí iría la lógica real de descarga: window.open(doc.url, '_blank');
  }

}
