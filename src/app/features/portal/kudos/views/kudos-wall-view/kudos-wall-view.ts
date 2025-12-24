import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importante para el modal

// Importamos nuestros "Legos"
import { KudoCard } from '../../components/kudo-card/kudo-card';
import { GiveKudoModal } from '../../components/give-kudo-modal/give-kudo-modal';
import { KudosService, Kudo } from '../../services/kudos.service';

import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';

@Component({
  selector: 'app-kudos-wall',
  imports: [CommonModule, 
    MatButtonModule, ContentLayoutView,
    MatIconModule, 
    MatDialogModule,
    KudoCard],
  templateUrl: './kudos-wall-view.html',
  styleUrl: './kudos-wall-view.scss',
})
export class KudosWallView implements OnInit {
  
  // Inyecciones de dependencias
  private service = inject(KudosService);
  private dialog = inject(MatDialog);

  // Estado de la vista (Signals)
  kudos = signal<Kudo[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadData();
  }

  // Función para cargar los datos (reutilizable)
  loadData() {
    this.loading.set(true);
    
    this.service.getAllKudos().subscribe({
      next: (data) => {
        // Ordenamos por fecha (el más reciente primero)
        const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.kudos.set(sortedData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando aplausos:', err);
        this.loading.set(false);
      }
    });
  }

  // Lógica para abrir el Modal
  openGiveKudo() {
    const dialogRef = this.dialog.open(GiveKudoModal, {
      width: '600px', // Ancho cómodo para el modal
      panelClass: 'aesthetic-dialog', // Clase para estilos globales (bordes redondeados, etc.)
      disableClose: true // Evita cerrar haciendo clic fuera por accidente
    });

    // Cuando el modal se cierra...
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si el usuario envió el aplauso (retornó true), recargamos el muro
        console.log('¡Aplauso enviado! Recargando muro...');
        this.loadData();
      }
    });
  }
}