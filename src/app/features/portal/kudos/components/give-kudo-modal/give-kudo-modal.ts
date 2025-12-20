import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { KudosService } from '../../services/kudos.service';
import { UserSearchInput } from '../../../../../shared/components/user-search-input/user-search-input';
// IMPORTANTE: Verifica que el nombre de la clase exportada sea UserSearchInputComponent
@Component({
  selector: 'app-give-kudo-modal',
  imports: [CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule,
    UserSearchInput],
  templateUrl: './give-kudo-modal.html',
  styleUrl: './give-kudo-modal.scss',
})
export class GiveKudoModal {

  private dialogRef = inject(MatDialogRef<GiveKudoModal>);
  private kudosService = inject(KudosService);

  // 1. Cargamos la configuración centralizada (Nada hardcodeado aquí)
  categories = this.kudosService.getCategories();



// --- SIGNALS DE ESTADO (Faltaban estos) ---
  selectedUser = signal<any>(null);      // Viene del hijo
  selectedCategory = signal<string | null>(null); // Selección de iconos
  message = signal('');                  // Textarea
  isSubmitting = signal(false);          // Loader


// --- MÉTODOS ---

  // 1. Recibe el usuario desde el componente hijo <app-user-search-input>
  onUserSelected(user: any) {
    this.selectedUser.set(user);
    // Opcional: console.log('Padre recibió:', user);
  }

  // 2. Seleccionar categoría (Faltaba)
  selectCategory(code: string) {
    this.selectedCategory.set(code);
  }

  // 3. Cerrar modal (Faltaba)
  close() {
    this.dialogRef.close();
  }

  // 4. Enviar
  submit() {
    // Extraemos valores
    const user = this.selectedUser();
    const category = this.selectedCategory();
    const msg = this.message();

    // Validamos
    if (!user || !category || !msg) return;

    this.isSubmitting.set(true);

    const payload = {
      receiverId: user.id, // ID real del usuario seleccionado
      categoryCode: category,
      message: msg
    };

    this.kudosService.sendKudo(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error enviando kudo:', err);
        this.isSubmitting.set(false);
      }
    });
  }
}