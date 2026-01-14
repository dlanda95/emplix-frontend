import { Component, input} from '@angular/core';

@Component({
  selector: 'app-data-field',
  imports: [],
  templateUrl: './data-field.html',
  styleUrl: './data-field.scss',
})
export class DataField {
  label = input.required<string>();
  value = input<string | number | null>(null);

  get hasContent(): boolean {
    return false; // Asumimos value por defecto para este diseño
  }
}
