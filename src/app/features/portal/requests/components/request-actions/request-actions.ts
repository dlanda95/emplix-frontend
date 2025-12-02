import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';


export interface RequestType {
  id: string;
  label: string;
  icon: string;
  description: string;
}


@Component({
  selector: 'app-request-actions',
  imports: [CommonModule, MatIconModule, MatRippleModule],
  templateUrl: './request-actions.html',
  styleUrl: './request-actions.scss',
})
export class RequestActions {

   @Input() requestTypes: RequestType[] = [];
  @Output() actionClicked = new EventEmitter<string>();

}
