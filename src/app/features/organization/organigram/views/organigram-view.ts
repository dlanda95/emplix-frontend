import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Componente Nodo
import { OrgNode, TreeNode } from '../components/org-node/org-node';
import { EmployeesService } from '../../directory/services/employee.service';
@Component({
  selector: 'app-organigram-view',
  imports: [CommonModule, OrgNode, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './organigram-view.html',
  styleUrl: './organigram-view.scss',
})
export class OrganigramView implements OnInit {
  private employeesService = inject(EmployeesService);
  
  loading = true;
  rootNodes = signal<TreeNode[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.employeesService.getDirectory().subscribe({
      next: (employees) => {
        this.rootNodes.set(this.buildTree(employees));
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // ALGORITMO: Convierte lista plana en árbol recursivo
  private buildTree(employees: any[]): TreeNode[] {
    const nodeMap = new Map<string, TreeNode>();
    
    // 1. Crear nodos para todos
    employees.forEach(emp => {
      nodeMap.set(emp.id, { 
        data: emp, 
        children: [], 
        expanded: true // Expandir por defecto
      });
    });

    const roots: TreeNode[] = [];

    // 2. Conectar padres e hijos
    employees.forEach(emp => {
      const node = nodeMap.get(emp.id)!;
      
      if (emp.supervisorId && nodeMap.has(emp.supervisorId)) {
        // Si tiene jefe, lo agregamos a los hijos del jefe
        const parent = nodeMap.get(emp.supervisorId)!;
        parent.children.push(node);
      } else {
        // Si no tiene jefe (o el jefe no está en la lista activa), es una Raíz
        roots.push(node);
      }
    });

    return roots;
  }
}