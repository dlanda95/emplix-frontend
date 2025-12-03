import { Component,Input, Output, EventEmitter , inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { AuthService } from '../../../../core/auth/auth.service';


@Component({
  selector: 'app-topbar',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
 @Input() title: string = 'Dashboard';
  @Output() menuClick = new EventEmitter<void>(); // Emitimos el evento al padre 

   // Inyectamos el servicio
  private authService = inject(AuthService);

   onLogout() {
    // Llamamos al método logout que ya limpia el localStorage y redirige
    this.authService.logout();
  }

}