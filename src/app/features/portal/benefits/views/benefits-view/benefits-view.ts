import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitCard } from '../../components/benefit-card/benefit-card';
import { BenefitsService, Benefit } from '../../services/benefits.service';

@Component({
  selector: 'app-benefits-view',
  imports: [CommonModule, BenefitCard],
  templateUrl: './benefits-view.html',
  styleUrl: './benefits-view.scss',
})
export class BenefitsView implements OnInit {
  private service = inject(BenefitsService);

  benefits = signal<Benefit[]>([]);
  loading = signal(true);
  currentFilter = signal<string>('ALL');

  filteredBenefits = computed(() => {
    const filter = this.currentFilter();
    if (filter === 'ALL') return this.benefits();
    return this.benefits().filter(b => b.category === filter);
  });

  ngOnInit() {
    this.service.getAllBenefits().subscribe(data => {
      this.benefits.set(data);
      this.loading.set(false);
    });
  }

  setFilter(cat: string) {
    this.currentFilter.set(cat);
  }
}