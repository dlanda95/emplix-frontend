import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTicket } from './payment-ticket';

describe('PaymentTicket', () => {
  let component: PaymentTicket;
  let fixture: ComponentFixture<PaymentTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTicket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTicket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
