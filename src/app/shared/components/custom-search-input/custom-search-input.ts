import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-search-input',
  imports: [CommonModule, MatIconModule],
  templateUrl: './custom-search-input.html',
  styleUrl: './custom-search-input.scss',
})
export class CustomSearchInput {
  @Input() placeholder: string = 'Buscar...';
  @Output() search = new EventEmitter<string>(); // Emite el valor limpio

  isFocused = false;
  private debounceTimer: any;

  onKeyUp(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    
    // Debounce: Esperamos 300ms antes de emitir para no filtrar en cada tecla
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.search.emit(value);
    }, 300);
  }

}
