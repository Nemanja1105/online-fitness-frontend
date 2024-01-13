import { Component } from '@angular/core';
import { FitnessProgramCardComponent } from '../components/fitness-program-card/fitness-program-card.component';

@Component({
  selector: 'app-my-fitness-programs',
  standalone: true,
  imports: [FitnessProgramCardComponent],
  templateUrl: './my-fitness-programs.component.html',
  styleUrl: './my-fitness-programs.component.css',
})
export class MyFitnessProgramsComponent {
  program = {
    name: 'Isklesali trbusnjaci za 30 dana',
    price: 15,
    difficulty: 'begginer',
    category: 'crossfit',
  };
}
