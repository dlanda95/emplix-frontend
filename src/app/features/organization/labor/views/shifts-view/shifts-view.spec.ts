import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsView } from './shifts-view';

describe('ShiftsView', () => {
  let component: ShiftsView;
  let fixture: ComponentFixture<ShiftsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
