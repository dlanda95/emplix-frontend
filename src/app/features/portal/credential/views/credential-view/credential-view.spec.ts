import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialView } from './credential-view';

describe('CredentialView', () => {
  let component: CredentialView;
  let fixture: ComponentFixture<CredentialView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
