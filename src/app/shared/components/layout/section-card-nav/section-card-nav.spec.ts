import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCardNav } from './section-card-nav';

describe('SectionCardNav', () => {
  let component: SectionCardNav;
  let fixture: ComponentFixture<SectionCardNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCardNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCardNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
