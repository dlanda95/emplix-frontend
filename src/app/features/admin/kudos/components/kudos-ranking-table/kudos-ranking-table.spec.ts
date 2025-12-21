import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosRankingTable } from './kudos-ranking-table';

describe('KudosRankingTable', () => {
  let component: KudosRankingTable;
  let fixture: ComponentFixture<KudosRankingTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KudosRankingTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KudosRankingTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
