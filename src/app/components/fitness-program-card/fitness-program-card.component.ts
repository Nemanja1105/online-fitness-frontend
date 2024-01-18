import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fitness-program-card',
  standalone: true,
  imports: [MatTooltipModule, RouterLink],
  templateUrl: './fitness-program-card.component.html',
  styleUrl: './fitness-program-card.component.css',
})
export class FitnessProgramCardComponent {
  @Input() program: any;
}
