import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PaymentTicket } from '../../components/payment-ticket/payment-ticket';
import { PaymentsService, Payment } from '../../services/payments.service';
import { ContentLayoutView } from '../../../../../shared/components/layout/content-layout-view/content-layout-view';
@Component({
  selector: 'app-payments-view',
  imports: [CommonModule, MatIconModule, PaymentTicket, ContentLayoutView],
  templateUrl: './payments-view.html',
  styleUrl: './payments-view.scss',
})
export class PaymentsView implements OnInit {
  private service = inject(PaymentsService);
  
  payments = signal<Payment[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.service.getMyPayments().subscribe(data => {
      this.payments.set(data);
      this.loading.set(false);
    });
  }
}