import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AssetCard } from '../../components/asset-card/asset-card';
import { AssetService, Asset } from '../../services/asset.service';
import { ContentLayoutView } from '@shared/components/layout/content-layout-view/content-layout-view';
import { EmptyState } from '@shared/components/ui/empty-state/empty-state';
@Component({
  selector: 'app-my-assets-view',
  imports: [CommonModule, MatIconModule, AssetCard, ContentLayoutView,EmptyState],
  templateUrl: './my-assets-view.html',
  styleUrl: './my-assets-view.scss',
})
export class MyAssetsView implements OnInit {
  private assetService = inject(AssetService);
  
  assets = signal<Asset[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.assetService.getMyAssets().subscribe(data => {
      this.assets.set(data);
      this.loading.set(false);
    });
  }
}
