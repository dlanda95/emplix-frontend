import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalHubV2 } from './personal-hub-v2';

describe('PersonalHubV2', () => {
  let component: PersonalHubV2;
  let fixture: ComponentFixture<PersonalHubV2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalHubV2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalHubV2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
