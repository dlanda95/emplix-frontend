import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para los inputs
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KudosService } from '../../services/kudos.service';

@Component({
  selector: 'app-give-kudo-modal',
  imports: [CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule,
    MatInputModule,
    MatFormFieldModule],
  templateUrl: './give-kudo-modal.html',
  styleUrl: './give-kudo-modal.scss',
})
export class GiveKudoModal {

  private dialogRef = inject(MatDialogRef<GiveKudoModal>);
  private kudosService = inject(KudosService);

  // 1. Cargamos la configuración centralizada (Nada hardcodeado aquí)
  categories = this.kudosService.getCategories();

  // 2. Signals para el formulario
  targetUser = signal(''); // Aquí iría el objeto de usuario seleccionado
  selectedCategory = signal<string | null>(null);
  message = signal('');
  
  isSubmitting = signal(false);

  // Método para seleccionar la categoría visualmente
  selectCategory(code: string) {
    this.selectedCategory.set(code);
  }

  // Cerrar sin acción
  close() {
    this.dialogRef.close();
  }

  // Enviar Aplauso
  submit() {
    // Validaciones simples
    if (!this.targetUser() || !this.selectedCategory() || !this.message()) {
      return;
    }

    this.isSubmitting.set(true);

    // Simulamos el envío al Backend
    setTimeout(() => {
      // Aquí armaríamos el objeto Kudo completo para enviarlo a la API
      const newKudoPayload = {
        toUser: this.targetUser(),
        category: this.selectedCategory(),
        msg: this.message(),
        date: new Date()
      };
      
      console.log('Enviando aplauso:', newKudoPayload);
      
      this.isSubmitting.set(false);
      this.dialogRef.close(true); // Retornamos true para indicar éxito
    }, 1000);
  }
}


