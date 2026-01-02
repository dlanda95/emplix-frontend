import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import confetti from 'canvas-confetti';


// 👇 1. Imports del Core y Shared (Arquitectura Limpia)
import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
import { EmptyState } from '@shared/components/ui/empty-state/empty-state';
import { Kudo } from '@core/models/kudos.model'; // <--- IMPORTANTE: El modelo vive aquí ahora

// 👇 2. Imports Locales (Feature)
import { KudosService } from '../../services/kudos.service';
import { KudoCard } from '../../components/kudo-card/kudo-card';
import { GiveKudoModal } from '../../components/give-kudo-modal/give-kudo-modal';

import { CustomButton } from '@shared/components/custom-button/custom-button';


@Component({
  selector: 'app-kudos-wall',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule, 
    MatDialogModule,
    ContentLayoutView,CustomButton,
    EmptyState,
    KudoCard
  ],
  templateUrl: './kudos-wall-view.html',
  styleUrl: './kudos-wall-view.scss',
})
export class KudosWallView implements OnInit {
  
  private service = inject(KudosService);
  private dialog = inject(MatDialog);

  allKudos = signal<Kudo[]>([]);
  loading = signal(true);

  // Filtro actual: 'ALL' | 'SENT' | 'RECEIVED'
  currentFilter = signal<'ALL' | 'SENT' | 'RECEIVED'>('ALL');

  // 👇 LÓGICA FILTRADA (COMPUTED)
  filteredKudos = computed(() => {
    const filter = this.currentFilter();
    const list = this.allKudos();

    if (filter === 'ALL') return list;
    return list.filter(k => k.type === filter);
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    
    this.service.getAllKudos().subscribe({
      next: (data) => {
        // 👇 3. CORRECCIÓN: Usamos 'createdAt' en lugar de 'date'
        const sortedData = data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.allKudos.set(sortedData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando aplausos:', err);
        this.loading.set(false);
      }
    });
  }


  ;
  setFilter(filter: 'ALL' | 'SENT' | 'RECEIVED') {
    this.currentFilter.set(filter);
  }
  getEmptyMessage() {
    switch (this.currentFilter()) {
      case 'SENT': return 'Aún no has enviado ningún aplauso.';
      case 'RECEIVED': return 'Aún no has recibido aplausos. ¡Sigue brillando!';
      default: return 'No hay actividad reciente.';
    }
  };

  openGiveKudo() {
    const dialogRef = this.dialog.open(GiveKudoModal, {
      width: '600px',
      // panelClass: 'aesthetic-dialog', // Descomenta si tienes estilos globales
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loadData(); // Recargamos si se envió un kudo
        // 2. 🎉 LANZAMOS EL CONFETI
        this.celebrate();
      }
    });
  }


  // 👇 FUNCIÓN DE CELEBRACIÓN
  celebrate() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      // Lanzamos confeti desde las esquinas inferiores
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#3b82f6', '#10b981', '#f59e0b'] // Tus colores corporativos
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}