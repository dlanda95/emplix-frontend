import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapStrip } from './tap-strip';

describe('TapStrip', () => {
  let component: TapStrip;
  let fixture: ComponentFixture<TapStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TapStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TapStrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
