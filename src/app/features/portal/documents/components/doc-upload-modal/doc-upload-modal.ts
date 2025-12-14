import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-doc-upload-modal',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './doc-upload-modal.html',
  styleUrl: './doc-upload-modal.scss',
})
export class DocUploadModal {
private dialogRef = inject(MatDialogRef<DocUploadModal>);

  file = signal<File | null>(null);
  isDragging = signal(false);
  isUploading = signal(false);

  // Eventos de Drag & Drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files.length) {
      this.file.set(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file.set(input.files[0]);
    }
  }

  upload() {
    if (!this.file()) return;

    this.isUploading.set(true);
    
    // Simulamos subida (Aquí conectarías con tu backend real)
    setTimeout(() => {
      this.isUploading.set(false);
      this.dialogRef.close(true); // Retorna true al terminar
    }, 2000);
  }

  close() {
    this.dialogRef.close();
  }
}