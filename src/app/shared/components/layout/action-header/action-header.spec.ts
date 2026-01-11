import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHeader } from './action-header';

describe('ActionHeader', () => {
  let component: ActionHeader;
  let fixture: ComponentFixture<ActionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
