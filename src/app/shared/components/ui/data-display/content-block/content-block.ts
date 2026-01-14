// content-block.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-content-block',
  imports: [CommonModule,MatIcon],
  templateUrl: './content-block.html',
  styleUrl: './content-block.scss',
})
export class ContentBlock {
title = input<string>('');
  icon = input<string>(''); // Nuevo input opcional para icono junto al título

}
