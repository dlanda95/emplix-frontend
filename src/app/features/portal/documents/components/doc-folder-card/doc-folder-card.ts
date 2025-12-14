import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-doc-folder-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './doc-folder-card.html',
  styleUrl: './doc-folder-card.scss',
})
export class DocFolderCard {
  @Input() icon: string = 'folder';
  @Input() label: string = '';
  @Input() count: string = '';
  @Input() color: 'blue' | 'purple' | 'guinda' | 'orange' = 'blue';

}
