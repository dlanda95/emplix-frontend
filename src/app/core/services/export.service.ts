import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class ExportService {

  /**
   * Exporta cualquier array de objetos a Excel
   * @param data Array de datos (ej. [{nombre: 'Juan', edad: 30}])
   * @param fileName Nombre del archivo sin extensión
   */
  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  /**
   * Exporta a PDF con tabla
   * @param headers Array de strings para la cabecera ['Nombre', 'Cargo']
   * @param data Array de Arrays para las filas [['Juan', 'Dev'], ['Ana', 'CEO']]
   * @param fileName Nombre del archivo
   * @param title Título del reporte en el PDF
   */
  exportToPdf(headers: string[], data: any[][], fileName: string, title: string): void {
    const doc = new jsPDF();
    
    // Título del documento
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(11);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 28);

    // Generar tabla
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 35,
      theme: 'grid', // Estilo limpio
      headStyles: { fillColor: [59, 130, 246] } // Color azul corporativo
    });

    doc.save(`${fileName}.pdf`);
  }
}