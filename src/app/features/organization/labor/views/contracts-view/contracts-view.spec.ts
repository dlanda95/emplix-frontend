import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsView } from './contracts-view';

describe('ContractsView', () => {
  let component: ContractsView;
  let fixture: ComponentFixture<ContractsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
