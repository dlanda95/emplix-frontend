import { Component, EventEmitter, Input, Output, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';



export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
// 👇 NUEVO TIPO DE TAMAÑOS
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';




@Component({
  selector: 'app-custom-button',
  imports: [CommonModule, MatRippleModule, MatIconModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {// CONFIGURACIÓN
  @Input() variant: ButtonVariant = 'primary';
  @Input() icon: string = '';       // Nombre del icono de Material (opcional)
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth: boolean = false; // ¿Ocupa el 100% del ancho?
  @Input() size: ButtonSize = 'md'; // 👇 NUEVO INPUT (Default: Regular)
  // ESTADOS
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;

  // EVENTOS
  @Output() onClick = new EventEmitter<Event>();


  // 👇 AGREGA ESTO: Controla el estilo del contenedor <app-custom-button>
  @HostBinding('style.width') get width() {
    return this.fullWidth ? '100%' : 'auto';
  }
  
  @HostBinding('style.display') get display() {
    return this.fullWidth ? 'block' : 'inline-block';
  }

  handleClick(event: Event) {
    if (!this.disabled && !this.isLoading) {
      this.onClick.emit(event);
    }
  }
}