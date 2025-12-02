import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-custom-button',
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {

    @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

}
