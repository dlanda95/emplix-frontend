import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Asset {
  id: string;
  type: 'LAPTOP' | 'PHONE' | 'MONITOR' | 'ACCESSORY' | 'LICENSE';
  name: string; // Ej: MacBook Pro M1
  serialNumber: string;
  assignedDate: Date;
  status: 'NEW' | 'USED' | 'REPAIR';
  image?: string; // URL de la foto del equipo
}

@Injectable({ providedIn: 'root' })
export class AssetService {

  getMyAssets(): Observable<Asset[]> {
    const mock: Asset[] = [
      {
        id: '1',
        type: 'LAPTOP',
        name: 'MacBook Pro 14" M2',
        serialNumber: 'C02XYZ123ABC',
        assignedDate: new Date('2025-01-15'),
        status: 'NEW',
        image: 'https://pngimg.com/d/macbook_PNG66.png' // Imagen genérica sin fondo
      },
      {
        id: '2',
        type: 'MONITOR',
        name: 'Dell UltraSharp 27"',
        serialNumber: 'DL-99887766',
        assignedDate: new Date('2025-01-15'),
        status: 'USED'
      },
      {
        id: '3',
        type: 'PHONE',
        name: 'iPhone 13 Corporativo',
        serialNumber: 'IMEI-33445566',
        assignedDate: new Date('2025-06-20'),
        status: 'NEW'
      },
      {
        id: '4',
        type: 'LICENSE',
        name: 'Microsoft 365 E5',
        serialNumber: 'License-Active',
        assignedDate: new Date('2025-01-01'),
        status: 'NEW'
      }
    ];
    return of(mock).pipe(delay(800));
  }
}