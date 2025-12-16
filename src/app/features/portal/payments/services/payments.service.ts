import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Payment {
  id: string;
  month: string;      // Ej: "Diciembre 2025"
  date: Date;         // Fecha de pago
  grossAmount: number; // Sueldo Bruto
  discounts: number;   // Descuentos (AFP, Impuestos)
  netAmount: number;   // Líquido a recibir
  status: 'PAID' | 'PENDING' | 'PROCESSED';
  currency: 'PEN' | 'USD';
}

@Injectable({ providedIn: 'root' })
export class PaymentsService {

  getMyPayments(): Observable<Payment[]> {
    const mock: Payment[] = [
      {
        id: '1',
        month: 'Diciembre 2025',
        date: new Date('2025-12-30'),
        grossAmount: 5000.00,
        discounts: 650.50,
        netAmount: 4349.50,
        status: 'PENDING', // Aún no pagan
        currency: 'PEN'
      },
      {
        id: '2',
        month: 'Gratificación Dic',
        date: new Date('2025-12-15'),
        grossAmount: 5000.00,
        discounts: 0,
        netAmount: 5000.00,
        status: 'PAID',
        currency: 'PEN'
      },
      {
        id: '3',
        month: 'Noviembre 2025',
        date: new Date('2025-11-30'),
        grossAmount: 5000.00,
        discounts: 640.20,
        netAmount: 4359.80,
        status: 'PAID',
        currency: 'PEN'
      }
    ];
    return of(mock).pipe(delay(800));
  }
}