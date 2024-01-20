import { Component } from '@angular/core';
import { FitnessProgramCardComponent } from '../components/fitness-program-card/fitness-program-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FitnessProgramServiceService } from '../services/FitnessProgramService/fitness-program-service.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { FitnessProgramCardDetailComponent } from '../components/fitness-program-card-detail/fitness-program-card-detail.component';

@Component({
  selector: 'app-my-fitness-programs',
  standalone: true,
  imports: [
    FitnessProgramCardComponent,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    DeleteDialogComponent,
    FitnessProgramCardDetailComponent


  ],
  templateUrl: './my-fitness-programs.component.html',
  styleUrl: './my-fitness-programs.component.css',
})
export class MyFitnessProgramsComponent {

  createdPrograms: any = [];
  activePrograms: any = [];
  finishedProgram: any = [];
  clientId: any = null;

  constructor(private fitnessProgramService: FitnessProgramServiceService, private jwtService: TokenService,
    private snackBar: CustomSnackBarService) {
    this.clientId = this.jwtService.getUser().id || null;
    this.fitnessProgramService.findAllFpForClient(this.clientId).subscribe({
      next: (data) => {
        this.createdPrograms = data;
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });
    this.fitnessProgramService.findAllActiveFpForClient(this.clientId).subscribe({
      next: (data) => {
        this.activePrograms = data;
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });
    this.fitnessProgramService.findAllFinishedFpForClient(this.clientId).subscribe({
      next: (data) => {
        this.finishedProgram = data;
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });
  }
  program = {
    id: 3,
    name: 'Isklesali trbusnjaci za 30 dana',
    price: 15,
    difficulty: 'Beginner',
    categoryName: 'Crossfit',
  };

  onProgramDelete(event: any) {
    this.createdPrograms = this.createdPrograms.filter((el: any) => el.id !== event);
  }


}
