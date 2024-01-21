import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,

} from '@angular/material/dialog';
import { TokenService } from '../../services/TokenService/token-service.service';
import { AdvisorQuestionService } from '../../services/AdvisorQuestionService/advisor-question.service';
import { CustomSnackBarService } from '../../services/CustomSnackBar/custom-snack-bar.service';

export interface DialogData {
  fpId: number;
}

@Component({
  selector: 'app-ask-advisor-dialog',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    NgClass,
    MatDialogContent, ReactiveFormsModule],
  templateUrl: './ask-advisor-dialog.component.html',
  styleUrl: './ask-advisor-dialog.component.css'
})
export class AskAdvisorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<AskAdvisorDialogComponent>,
    private jwtService: TokenService, private advisorQuestionService: AdvisorQuestionService, private snackBar: CustomSnackBarService) {
    console.log(data);
  }
  message: any = new FormControl('', Validators.required);

  onBlur(control: any) {
    control.markAsTouched();
  }

  askAdvisorSubmit() {
    let clientId = this.jwtService.getUser().id;
    let obj = { message: this.message.value, sender: clientId, fitnessProgram: this.data }
    this.advisorQuestionService.askQuestion(obj).subscribe({
      next: () => {
        this.snackBar.openSnackBar(
          'Question successfully sent to advisor',
          'close',
          true
        );
        this.dialogRef.close();
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
