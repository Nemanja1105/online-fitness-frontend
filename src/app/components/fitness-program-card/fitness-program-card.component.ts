import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ImageService } from '../../services/Image/image.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FitnessProgramServiceService } from '../../services/FitnessProgramService/fitness-program-service.service';
import { CustomSnackBarService } from '../../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../../services/TokenService/token-service.service';

@Component({
  selector: 'app-fitness-program-card',
  standalone: true,
  imports: [MatTooltipModule, RouterLink, NgClass],
  templateUrl: './fitness-program-card.component.html',
  styleUrl: './fitness-program-card.component.css',
})
export class FitnessProgramCardComponent {
  @Input() program: any;
  @Output() onProgramDelete = new EventEmitter<any>();
  clientId: any = null;
  constructor(private router: Router, private imageService: ImageService, public dialog: MatDialog,
    private fitnessProgramService: FitnessProgramServiceService, private snackBar: CustomSnackBarService, private jwtService: TokenService) {
    this.clientId = this.jwtService.getUser().id;
  }

  locationIcon() {
    if (this.program?.location === "Online")
      return "../../../assets/onlineIcon.png";
    else if (this.program?.location === "Gym")
      return "../../../assets/gymIcon.png";
    else
      return "../../../assets/parkIcon.png";
  }

  showImage() {
    if (this.program?.imageId)
      return this.imageService.downloadImage(this.program?.imageId);
    else return '../../assets/victor-freitas-WvDYdXDzkhs-unsplash.jpg';
  }

  onCardClick() {
    this.router.navigate(['/fitness-program', this.program?.id]);
  }

  deleteProgram() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, { data: { message: "Are you sure you want to delete the fitness program?" } })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fitnessProgramService.deleteFp(this.clientId, this.program.id).subscribe({
          next: () => {
            this.onProgramDelete.emit(this.program.id);
            this.snackBar.openSnackBar(
              'Fitness program successfully deleted',
              'close',
              true
            );
          }, error: () => {
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          }
        })
      }
    })
  }

}
