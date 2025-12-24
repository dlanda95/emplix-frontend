import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IdCard } from '../../components/id-card/id-card';
import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';
@Component({
  selector: 'app-credential-view',
  imports: [CommonModule, MatButtonModule, MatIconModule, IdCard, ContentLayoutView],
  templateUrl: './credential-view.html',
  styleUrl: './credential-view.scss',
})
export class CredentialView {

  // En el futuro, esto viene de authService.currentUser()
  user = signal({
    name: 'Diego Landa',
    position: 'Tech Lead',
    code: 'EMP-2025-001'
  });

}
