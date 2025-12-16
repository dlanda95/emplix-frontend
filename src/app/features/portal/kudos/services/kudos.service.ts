import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

// 1. DEFINICIÓN DINÁMICA DE CATEGORÍAS (Configuración)
export interface ApplauseCategory {
  code: string;
  label: string;
  score: number; // El peso del aplauso
  icon: string;
  colorClass: string; // Para estilos CSS
  description: string;
}

export const APPLAUSE_CONFIG: ApplauseCategory[] = [
  { 
    code: 'TEAMWORK', 
    label: 'Trabajo en Equipo y Colaboración', 
    score: 2.0, 
    icon: 'groups', 
    colorClass: 'blue',
    description: 'Fomenta la unión y ayuda a sus compañeros.'
  },
  { 
    code: 'CLIENT_FOCUS', 
    label: 'Compromiso con el Cliente', 
    score: 2.5, 
    icon: 'support_agent', 
    colorClass: 'green',
    description: 'Excede expectativas y genera confianza.'
  },
  { 
    code: 'RESULTS', 
    label: 'Orientación a Resultados', 
    score: 3.0, 
    icon: 'trending_up', 
    colorClass: 'orange',
    description: 'Cumple objetivos con excelencia y calidad.'
  },
  { 
    code: 'INNOVATION', 
    label: 'Agente de Cambio e Innovación', 
    score: 3.5, 
    icon: 'lightbulb', 
    colorClass: 'purple',
    description: 'Propone mejoras y se adapta al cambio.'
  },
  { 
    code: 'LEADERSHIP', 
    label: 'Lidera e Inspira (Influenciador)', 
    score: 4.0, 
    icon: 'military_tech', 
    colorClass: 'gold',
    description: 'Motiva a otros y es un referente positivo.'
  }
];

export interface Kudo {
  id: string;
  from: { name: string; position: string; avatar?: string };
  to: { name: string; position: string; avatar?: string; hireDate: Date };
  categoryCode: string; // Referencia al código de arriba
  message: string;
  date: Date;
}

// Interfaz para el Reporte de RRHH
export interface EmployeeKudoSummary {
  employeeId: string;
  name: string;
  position: string;
  hireDate: Date;
  cycleStart: Date; // Inicio de su año personal
  cycleEnd: Date;   // Fin de su año personal
  totalAplausos: number;
  totalScore: number; // Suma ponderada
  breakdown: { [key: string]: number }; // Cuántos de cada tipo tiene
}

@Injectable({ providedIn: 'root' })
export class KudosService {

  // Obtener configuración (Simula DB)
  getCategories(): ApplauseCategory[] {
    return APPLAUSE_CONFIG;
  }

  // Obtener Muro General
  getAllKudos(): Observable<Kudo[]> {
    // Mock Data
    return of([
      {
        id: '1',
        from: { name: 'Diego Landa', position: 'Tech Lead' },
        to: { name: 'Ana Torres', position: 'Product Owner', hireDate: new Date('2022-05-10') },
        categoryCode: 'LEADERSHIP',
        message: 'Gracias por guiar al equipo en momentos de incertidumbre.',
        date: new Date()
      },
      // ... más datos
    ]).pipe(delay(500));
  }

  // Obtener Reporte para RRHH (Cálculo complejo simulado)
  getHrReport(): Observable<EmployeeKudoSummary[]> {
    const mockReport: EmployeeKudoSummary[] = [
      {
        employeeId: 'EMP001',
        name: 'Ana Torres',
        position: 'Product Owner',
        hireDate: new Date('2022-05-10'),
        cycleStart: new Date('2025-05-10'),
        cycleEnd: new Date('2026-05-09'),
        totalAplausos: 15,
        totalScore: 48.5, // Suma de puntos
        breakdown: { 'LEADERSHIP': 5, 'RESULTS': 3, 'TEAMWORK': 7 }
      },
      {
        employeeId: 'EMP002',
        name: 'Jorge Vega',
        position: 'Dev Backend',
        hireDate: new Date('2024-01-15'),
        cycleStart: new Date('2025-01-15'),
        cycleEnd: new Date('2026-01-14'),
        totalAplausos: 8,
        totalScore: 22.0,
        breakdown: { 'INNOVATION': 2, 'TEAMWORK': 6 }
      }
    ];
    return of(mockReport).pipe(delay(800));
  }
}