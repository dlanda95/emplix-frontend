import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-card',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {
@Input() name: string | null | undefined = '';
  @Input() position: string | null | undefined = '';
  @Input() email: string | null | undefined = '';
  @Input() role: 'BOSS' | 'PEER' | 'SUBORDINATE' = 'PEER';

  get initials(): string {
    if (!this.name) return '';
    return this.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
}

