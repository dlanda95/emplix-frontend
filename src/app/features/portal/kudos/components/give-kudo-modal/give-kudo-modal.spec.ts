import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveKudoModal } from './give-kudo-modal';

describe('GiveKudoModal', () => {
  let component: GiveKudoModal;
  let fixture: ComponentFixture<GiveKudoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveKudoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveKudoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
