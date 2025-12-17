import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


// Interfaz para tipar los datos EN OTRO ARCHIVO
export interface InfoField {
  label: string;
  value: string;
  icon?: string;
  isLink?: boolean;
}

@Component({
  selector: 'app-info-section',
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-section.html',
  styleUrl: './info-section.scss',
})
export class InfoSection {

    @Input() title: string = '';
  @Input() icon: string = 'info';
  @Input() data: InfoField[] = [];

}
