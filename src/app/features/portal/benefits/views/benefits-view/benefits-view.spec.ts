import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsView } from './benefits-view';

describe('BenefitsView', () => {
  let component: BenefitsView;
  let fixture: ComponentFixture<BenefitsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
