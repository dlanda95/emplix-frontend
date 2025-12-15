import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Benefit {
  id: string;
  brandName: string;
  logo: string;         // URL del logo de la marca
  coverImage: string;   // Imagen de fondo (pizza, pesas, etc.)
  discount: string;     // Ej: "20%" o "2x1"
  category: 'FOOD' | 'HEALTH' | 'EDUCATION' | 'ENTERTAINMENT';
  description: string;
  code?: string;        // Código de cupón (opcional)
}

@Injectable({ providedIn: 'root' })
export class BenefitsService {

  getAllBenefits(): Observable<Benefit[]> {
    const mock: Benefit[] = [
      {
        id: '1',
        brandName: 'Gold\'s Gym',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Gold%27s_Gym_logo.svg/1200px-Gold%27s_Gym_logo.svg.png',
        coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=60',
        discount: '50%',
        category: 'HEALTH',
        description: 'En matrícula y primer mes en plan anual.',
        code: 'EMPLIX-GYM'
      },
      {
        id: '2',
        brandName: 'Starbucks',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
        coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=60',
        discount: '2x1',
        category: 'FOOD',
        description: 'En bebidas preparadas todos los viernes.',
      },
      {
        id: '3',
        brandName: 'Cineplanet',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Cineplanet_Logo.png',
        coverImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=60',
        discount: '30%',
        category: 'ENTERTAINMENT',
        description: 'En entradas 2D y 3D de lunes a jueves.',
        code: 'CORP-CINE'
      },
      {
        id: '4',
        brandName: 'Coursera',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg',
        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=60',
        discount: 'Gratis',
        category: 'EDUCATION',
        description: 'Licencias ilimitadas para cursos seleccionados.',
      }
    ];
    return of(mock).pipe(delay(600));
  }
}