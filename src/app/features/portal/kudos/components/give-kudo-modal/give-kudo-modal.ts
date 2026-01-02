import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { UserSearchInput } from '@shared/components/user-search-input/user-search-input';
import { UserAvatar } from '@shared/components/ui/user-avatar/user-avatar';
import { KudosService } from '../../services/kudos.service';
import { APPLAUSE_CONFIG } from '../../kudos.config';

@Component({
  selector: 'app-give-kudo-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule, 
    FormsModule,
    UserSearchInput, // 👈 Importante
  
  ],
  templateUrl: './give-kudo-modal.html',
  styleUrl: './give-kudo-modal.scss'
})
export class GiveKudoModal {
  private dialogRef = inject(MatDialogRef<GiveKudoModal>);
  private kudosService = inject(KudosService);

  categories = APPLAUSE_CONFIG;
  
  // Estado del formulario
  
  selectedUser = signal<any>(null);
  selectedCategory = signal<string>('');
  message = signal('');
  isSending = signal(false);

  // Cuando el buscador emite un usuario
  onUserSelected(user: any) {
    this.selectedUser.set(user);
   console.log('Usuario seleccionado en modal:', user);
  }

  selectCategory(code: string) {
    this.selectedCategory.set(code);
  }

  submit() {
    if (!this.selectedUser() || !this.selectedCategory() || !this.message()) return;

    this.isSending.set(true);
    
    this.kudosService.sendKudo({
      receiverId: this.selectedUser().id,
      categoryCode: this.selectedCategory(),
      message: this.message()
    }).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.isSending.set(false)
    });
  }

  back() {
   
    this.selectedUser.set(null);
  }
}