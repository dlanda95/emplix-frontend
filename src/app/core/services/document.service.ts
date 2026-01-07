import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface DocFile {
  id: string;
  name: string;
  category: 'PAYSLIPS' | 'CONTRACTS' | 'POLICIES' | 'UPLOADS';
  date: string;
  size: string;
  type: 'PDF' | 'DOC' | 'IMG';
  url: string; // URL de descarga (simulada)
}

@Injectable({ providedIn: 'root' })
export class DocumentService {

  // Simulación de base de datos
  private mockDocs: DocFile[] = [
    { id: '1', name: 'Boleta Noviembre 2025.pdf', category: 'PAYSLIPS', date: '2025-11-30', size: '1.2 MB', type: 'PDF', url: '#' },
    { id: '2', name: 'Boleta Octubre 2025.pdf', category: 'PAYSLIPS', date: '2025-10-31', size: '1.2 MB', type: 'PDF', url: '#' },
    { id: '3', name: 'Contrato Indeterminado.pdf', category: 'CONTRACTS', date: '2024-01-15', size: '3.5 MB', type: 'PDF', url: '#' },
    { id: '4', name: 'Adenda Salarial 2025.pdf', category: 'CONTRACTS', date: '2025-01-01', size: '0.8 MB', type: 'PDF', url: '#' },
    { id: '5', name: 'Reglamento Interno de Trabajo.pdf', category: 'POLICIES', date: '2023-05-20', size: '12 MB', type: 'PDF', url: '#' },
    { id: '6', name: 'Código de Ética.pdf', category: 'POLICIES', date: '2023-05-20', size: '5 MB', type: 'PDF', url: '#' },
    { id: '7', name: 'Certificado Medico.jpg', category: 'UPLOADS', date: '2025-08-12', size: '2.1 MB', type: 'IMG', url: '#' },
  ];

  getDocumentsByCategory(category: string): Observable<DocFile[]> {
    const files = this.mockDocs.filter(d => d.category === category);
    return of(files).pipe(delay(400)); // Simulamos un pequeño delay de red
  }
}