import { Component } from '@angular/core';
import { FitnessProgramCardDetailComponent } from '../components/fitness-program-card-detail/fitness-program-card-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CategoriesService } from '../services/Categories/categories.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FitnessProgramServiceService } from '../services/FitnessProgramService/fitness-program-service.service';

@Component({
  selector: 'app-fitness-programs',
  standalone: true,
  imports: [FitnessProgramCardDetailComponent, MatPaginatorModule, ReactiveFormsModule],
  templateUrl: './fitness-programs.component.html',
  styleUrl: './fitness-programs.component.css'
})
export class FitnessProgramsComponent {
  constructor(private categoryService: CategoriesService, private snackBar: CustomSnackBarService, private fb: FormBuilder, private fitnessProgramService: FitnessProgramServiceService) {
    this.categoryService.findAll().subscribe({
      next: (data) => { this.categories = data }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });
    this.findAllByFilter();
  }

  search = new FormControl('');
  category = new FormControl('default');
  difficulty = new FormControl('default');
  location = new FormControl('default');
  categories: any = [];
  programs: any = [];
  //form = this.fb.group({ search: [''], category: [''], difficulty: [''], location: [''] });

  program = {
    id: 3,
    name: 'Isklesani trbusnjaci za 30 dana',
    price: 15,
    difficulty: 'begginer',
    category: 'crossfit',
  };

  lenght: any = 100;
  pageSize: any = 5;
  pageIndex: any = 0;

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAllByFilter();
  }


  onFilterChange() {
    this.findAllByFilter();
  }

  findAllByFilter() {
    let obj: any = [];
    if (this.search.value !== "")
      obj.push({ columnName: "search", columnValue: this.search.value });
    if (this.category.value !== "default")
      obj.push({ columnName: "category", columnValue: this.category.value });
    if (this.difficulty.value !== "default")
      obj.push({ columnName: "difficulty", columnValue: this.difficulty.value });
    if (this.location.value !== "default")
      obj.push({ columnName: "location", columnValue: this.location.value });
    this.fitnessProgramService.findAllByFilters(this.pageIndex, this.pageSize, obj).subscribe({
      next: (data) => {
        this.programs = data.content;
        this.lenght = data.totalElements;
        console.log(data);
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });


  }
}
