import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Benefit } from '../../services/benefits.service';

@Component({
  selector: 'app-benefit-card',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './benefit-card.html',
  styleUrl: './benefit-card.scss',
})
export class BenefitCard {

  @Input({ required: true }) benefit!: Benefit;
}

