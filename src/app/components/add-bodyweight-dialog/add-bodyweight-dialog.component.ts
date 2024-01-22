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
import { BodyWeightService } from '../../services/BodyWeightService/body-weight.service';
import { TokenService } from '../../services/TokenService/token-service.service';
import { CustomSnackBarService } from '../../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-add-bodyweight-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-bodyweight-dialog.component.html',
  styleUrl: './add-bodyweight-dialog.component.css'
})
export class AddBodyweightDialogComponent {
  date = new FormControl(null, Validators.required);
  weight = new FormControl(null, [Validators.required, Validators.min(0)]);
  form = this.fb.group({ date: this.date, weight: this.weight });
  clientId: any = null;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddBodyweightDialogComponent>,
    private bodyWeightService: BodyWeightService, private jwtService: TokenService, private snackBar: CustomSnackBarService) {
    this.clientId = this.jwtService.getUser().id;
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  onSubmit() {
    let obj = this.form.value;
    this.bodyWeightService.insertBodyWeightForClient(this.clientId, { weight: obj.weight, createdAt: obj.date }).subscribe({
      next: (data) => {
        this.snackBar.openSnackBar(
          'Bodyweight successfully added',
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
