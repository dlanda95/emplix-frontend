import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Payment } from '../../services/payments.service';

@Component({
  selector: 'app-payment-ticket',
  imports: [CommonModule, MatButtonModule, MatIconModule, DatePipe, CurrencyPipe],
  templateUrl: './payment-ticket.html',
  styleUrl: './payment-ticket.scss',
})
export class PaymentTicket {
  @Input({ required: true }) payment!: Payment;

  downloadPdf(event: Event) {
    event.stopPropagation();
    console.log('Descargando boleta:', this.payment.month);
    // Aquí iría la lógica real de descarga
  }

}
