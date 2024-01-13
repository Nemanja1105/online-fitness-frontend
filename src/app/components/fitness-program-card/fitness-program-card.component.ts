import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-fitness-program-card',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './fitness-program-card.component.html',
  styleUrl: './fitness-program-card.component.css',
})
export class FitnessProgramCardComponent {
  @Input() program: any;
}
