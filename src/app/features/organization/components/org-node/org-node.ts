import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


export interface TreeNode {
  data: any; // Datos del empleado
  children: TreeNode[];
  expanded: boolean;
}

@Component({
  selector: 'app-org-node',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './org-node.html',
  styleUrl: './org-node.scss',
})
export class OrgNode {

  @Input() node!: TreeNode;
  @Input() isRoot = false;

  get initials() {
    return (this.node.data.firstName[0] + this.node.data.lastName[0]).toUpperCase();
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.node.expanded = !this.node.expanded;
  }
}


