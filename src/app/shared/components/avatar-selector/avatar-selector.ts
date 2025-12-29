import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para ngIf/ngClass
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-avatar-selector',
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './avatar-selector.html',
  styleUrl: './avatar-selector.scss',
})
export class AvatarSelector {@Input() photoUrl: string | null = null;
  @Input() name: string = ''; // Recibimos el nombre para calcular iniciales
  @Input() isLoading: boolean = false;
  @Input() editable: boolean = true;
  
  @Output() fileSelected = new EventEmitter<File>();

  // Getter para las iniciales
  get initials(): string {
    if (!this.name) return '';
    return this.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  onFileChange(event: any): void {
    if (event.target.files?.length > 0) {
      this.fileSelected.emit(event.target.files[0]);
    }
  }
}