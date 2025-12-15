import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssetsView } from './my-assets-view';

describe('MyAssetsView', () => {
  let component: MyAssetsView;
  let fixture: ComponentFixture<MyAssetsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAssetsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAssetsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
