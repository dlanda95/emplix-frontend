import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-id-card',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './id-card.html',
  styleUrl: './id-card.scss',
})
export class IdCard {
@Input() name: string = '';
  @Input() position: string = '';
  @Input() employeeId: string = '';
  
  isFlipped = signal(false);

  get initials(): string {
    return this.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }

  flip() {
    this.isFlipped.update(v => !v);
  }
}