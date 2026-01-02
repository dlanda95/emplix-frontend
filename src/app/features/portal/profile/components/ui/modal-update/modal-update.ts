import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'


@Component({
  selector: 'app-modal-update',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './modal-update.html',
  styleUrl: './modal-update.scss',
})
export class ModalUpdate{
  @Input() title: string = 'Actualizar';
    
  @Input() subtitle: string = '';
  @Output() closeEvent = new EventEmitter<void>();

  close() {
    this.closeEvent.emit();
  }
}