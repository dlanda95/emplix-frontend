import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborAssignmentModal } from './labor-assignment-modal';

describe('LaborAssignmentModal', () => {
  let component: LaborAssignmentModal;
  let fixture: ComponentFixture<LaborAssignmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaborAssignmentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaborAssignmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
