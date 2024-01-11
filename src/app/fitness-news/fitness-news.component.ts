import { Component } from '@angular/core';
import { FitnessNewsService } from '../services/FitnessNews/fitness-news.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-fitness-news',
  standalone: true,
  imports: [],
  templateUrl: './fitness-news.component.html',
  styleUrl: './fitness-news.component.css',
})
export class FitnessNewsComponent {
  news: any;
  constructor(
    private newsService: FitnessNewsService,
    private snackBar: CustomSnackBarService
  ) {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.news = data;
      },
      error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      },
    });
  }
}
