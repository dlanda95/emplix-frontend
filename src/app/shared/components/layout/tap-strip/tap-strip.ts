import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';



export interface TabItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-tap-strip',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatTabsModule, MatIconModule],
  templateUrl: './tap-strip.html',
  styleUrl: './tap-strip.scss',
})
export class TapStrip {
tabs = input.required<TabItem[]>();

}
