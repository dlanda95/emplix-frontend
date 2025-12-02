import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-request-stat',
  imports: [CommonModule, MatIconModule],
  templateUrl: './request-stat.html',
  styleUrl: './request-stat.scss',
})
export class RequestStat {

   @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = 'info';
  @Input() variant: 'primary' | 'blue' | 'green' | 'orange' = 'primary';

}
