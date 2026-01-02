import { Component, Input, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// 👇 Imports
import { UserAvatar } from '@shared/components/ui/user-avatar/user-avatar';
import { Kudo, ApplauseCategory } from '@core/models/kudos.model';
import { APPLAUSE_CONFIG } from '../../kudos.config';


@Component({
  selector: 'app-kudo-card',
  imports: [CommonModule, MatIconModule, DatePipe,UserAvatar],
  templateUrl: './kudo-card.html',
  styleUrl: './kudo-card.scss',
})
export class KudoCard {
  @Input({ required: true }) kudo!: Kudo;

  // Lógica reactiva para encontrar la configuración visual
  config = computed<ApplauseCategory | undefined>(() => {
    return APPLAUSE_CONFIG.find(c => c.code === this.kudo.categoryCode);
  });

  // Helpers de Nombre Completo
  
  get senderName() { 
    return `${this.kudo.sender.firstName} ${this.kudo.sender.lastName}`; }
 
  
    get receiverName() { 
    return `${this.kudo.receiver.firstName} ${this.kudo.receiver.lastName}`; }
}


