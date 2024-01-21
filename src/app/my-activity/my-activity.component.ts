import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddActivityDialogComponent } from '../components/add-activity-dialog/add-activity-dialog.component';
import { ActivityService } from '../services/ActivityService/activity.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-my-activity',
  standalone: true,
  imports: [MatTooltipModule, DatePipe],
  templateUrl: './my-activity.component.html',
  styleUrl: './my-activity.component.css'
})
export class MyActivityComponent {
  activities: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  clientId: any = null;

  constructor(public dialog: MatDialog, private activityService: ActivityService, private snackBar: CustomSnackBarService, private jwtService: TokenService) {
    this.clientId = this.jwtService.getUser().id;
    this.activityService.findAllActivitiesForClient(this.clientId).subscribe({
      next: (data) => { this.activities = data }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
  }

  addNewActivity() {
    let dialog = this.dialog.open(AddActivityDialogComponent, { width: '400px' });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.activities.push(result);
      }
    })
  }

  deleteActivity(activity: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, { data: { message: "Are you sure you want to delete the activity?" } })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activityService.deleteActivityForClient(this.clientId, activity.id).subscribe({
          next: () => {
            this.activities = this.activities.filter((el: any) => el.id !== activity.id);
            this.snackBar.openSnackBar(
              'Activity successfully deleted',
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
    });
  }
}
