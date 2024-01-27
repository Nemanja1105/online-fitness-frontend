import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddActivityDialogComponent } from '../components/add-activity-dialog/add-activity-dialog.component';
import { ActivityService } from '../services/ActivityService/activity.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../services/TokenService/token-service.service';
import { DatePipe } from '@angular/common';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';
import { AddBodyweightDialogComponent } from '../components/add-bodyweight-dialog/add-bodyweight-dialog.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BodyWeightService } from '../services/BodyWeightService/body-weight.service';

@Component({
  selector: 'app-my-activity',
  standalone: true,
  imports: [MatTooltipModule, DatePipe, AreaChartComponent, ReactiveFormsModule],
  templateUrl: './my-activity.component.html',
  styleUrl: './my-activity.component.css'
})
export class MyActivityComponent {
  activities: any = [];
  clientId: any = null;
  statistics: any = null;
  startDate: any = new FormControl(null);
  endDate: any = new FormControl(null);
  downloadUrl: any = "";

  constructor(public dialog: MatDialog, private activityService: ActivityService, private snackBar: CustomSnackBarService,
    private jwtService: TokenService, private bodyWeightService: BodyWeightService) {
    this.clientId = this.jwtService.getUser().id;
    this.downloadUrl = bodyWeightService.downloadPdf(this.clientId);
    this.activityService.findAllActivitiesForClient(this.clientId).subscribe({
      next: (data) => { this.activities = data }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })
    setTimeout(() => this.loadBodyWeightStatistic(), 1000);
    //this.loadBodyWeightStatistic();
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

  addNewBodyweight() {
    let dialogRef = this.dialog.open(AddBodyweightDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => { if (result !== null) this.loadBodyWeightStatistic() })
  }

  loadBodyWeightStatistic() {
    let obj: any = {};
    if (this.startDate.value)
      obj['startDate'] = this.startDate.value;
    if (this.endDate.value)
      obj['endDate'] = this.endDate.value;
    this.bodyWeightService.getStatisticsForClient(this.clientId, obj).subscribe({
      next: (data) => {
        this.statistics = data;
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    })

  }
}
