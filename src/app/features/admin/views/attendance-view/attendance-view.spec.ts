import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceView } from './attendance-view';

describe('AttendanceView', () => {
  let component: AttendanceView;
  let fixture: ComponentFixture<AttendanceView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
