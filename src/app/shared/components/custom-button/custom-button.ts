import { Component, input,output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-custom-button',
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {

   // @Input() loading: boolean = false;
  //  @Input() disabled: boolean = false;


  // --- SIGNALS (Inputs Modernos) ---
  // Ahora son funciones reactivas: this.loading()
  loading = input(false);
  disabled = input(false);
  
  // Agregamos flexibilidad para que sea un verdadero Lego:
  color = input<'primary' | 'accent' | 'warn' | ''>('primary'); 
  type = input<'button' | 'submit'>('submit'); 

  // Output moderno (opcional, por si quieres capturar el click nativo)
  onClick = output<Event>();

  handleClick(event: Event) {
    // Evitamos clics fantasmas si está cargando
    if (!this.loading() && !this.disabled()) {
      this.onClick.emit(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }




}
