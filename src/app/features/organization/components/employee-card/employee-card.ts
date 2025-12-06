import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-employee-card',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {
  @Input() employee: any;
  @Input() isAdmin: boolean = false;
  @Output() edit = new EventEmitter<any>();

  get initials(): string {
    if (!this.employee) return '';
    return (this.employee.firstName[0] + this.employee.lastName[0]).toUpperCase();
  }

  get fullName(): string {
    return `${this.employee.firstName} ${this.employee.lastName}`;
  }
}


