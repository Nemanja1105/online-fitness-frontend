import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,

} from '@angular/material/dialog';
import { ActivityService } from '../../services/ActivityService/activity.service';
import { CustomSnackBarService } from '../../services/CustomSnackBar/custom-snack-bar.service';
import { TokenService } from '../../services/TokenService/token-service.service';

@Component({
  selector: 'app-add-activity-dialog',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent, ReactiveFormsModule, NgClass],
  templateUrl: './add-activity-dialog.component.html',
  styleUrl: './add-activity-dialog.component.css'
})
export class AddActivityDialogComponent {
  name = new FormControl('', Validators.required);
  set = new FormControl('', [Validators.required, Validators.min(0)]);
  rep = new FormControl('', [Validators.required, Validators.min(0)]);
  weight = new FormControl('', [Validators.required, Validators.min(0)]);
  clientId: any = null;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddActivityDialogComponent>, private activityService: ActivityService
    , private snackBar: CustomSnackBarService, private jwtService: TokenService) {
    this.clientId = this.jwtService.getUser().id;

  }
  form = this.fb.group({ name: this.name, sets: this.set, reps: this.rep, weight: this.weight });

  onBlur(control: any) {
    control.markAsTouched();
  }

  onSubmit() {
    let obj = this.form.value;
    this.activityService.insertActivityForClient(this.clientId, obj).subscribe({
      next: (data) => {
        this.snackBar.openSnackBar(
          'Activity successfully added',
          'close',
          true
        );
        this.dialogRef.close(data);
      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
        this.dialogRef.close(null);
      }
    });
  }
}
