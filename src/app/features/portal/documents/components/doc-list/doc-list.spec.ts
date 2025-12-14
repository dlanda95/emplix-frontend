import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocList } from './doc-list';

describe('DocList', () => {
  let component: DocList;
  let fixture: ComponentFixture<DocList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
