import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KudoCard } from './kudo-card';

describe('KudoCard', () => {
  let component: KudoCard;
  let fixture: ComponentFixture<KudoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KudoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KudoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
