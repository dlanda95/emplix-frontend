import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextCard } from './context-card';

describe('ContextCard', () => {
  let component: ContextCard;
  let fixture: ComponentFixture<ContextCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
