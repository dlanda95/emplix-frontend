import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-card',
  imports: [CommonModule],
  templateUrl: './section-card.html',
  styleUrl: './section-card.scss',
})
export class SectionCard {

 title = input.required<string>();
  subtitle = input<string>(); 
}
