import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Asset } from '../../services/asset.service';

@Component({
  selector: 'app-asset-card',
  imports: [CommonModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './asset-card.html',
  styleUrl: './asset-card.scss',
})
export class AssetCard {
  @Input({ required: true }) asset!: Asset;

  getIcon(type: string): string {
    const map: any = {
      'LAPTOP': 'laptop_mac',
      'PHONE': 'smartphone',
      'MONITOR': 'monitor',
      'ACCESSORY': 'headphones',
      'LICENSE': 'verified_user'
    };
    return map[type] || 'devices';
  }

}
