import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-header',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss',
})
export class ProfileHeader {


 

    @Input() fullName: string = '';
  @Input() jobTitle: string = '';
  @Input() location: string = '';
  
  get initials() {
    return this.fullName
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

}
