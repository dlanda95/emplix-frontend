import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocFolderCard } from './doc-folder-card';

describe('DocFolderCard', () => {
  let component: DocFolderCard;
  let fixture: ComponentFixture<DocFolderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocFolderCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocFolderCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
