import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { confirmPasswordValidator } from '../../validators/password.validator';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/Auth/auth.service';
import { TokenService } from '../../services/TokenService/token-service.service';
import { Router } from '@angular/router';
import { CustomSnackBarService } from '../../services/CustomSnackBar/custom-snack-bar.service';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  oldPassword = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
  ]);
  repeatPassword = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
  ]);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private router: Router,
    private snackBar: CustomSnackBarService
  ) {}

  changeForm = this.fb.group(
    {
      oldPassword: this.oldPassword,
      password: this.password,
      repeatPassword: this.repeatPassword,
    },
    { validators: confirmPasswordValidator }
  );

  onBlur(control: any) {
    control.markAsTouched();
  }

  onSubmit() {
    let user = this.tokenService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
    }
    this.authService
      .change({
        id: user.id,
        oldPassword: this.oldPassword.value,
        newPassword: this.password.value,
      })
      .subscribe({
        next: () => {
          this.snackBar.openSnackBar(
            'Password successfully changed',
            'close',
            true
          );
          this.dialogRef.close();
        },
        error: (error) => {
          if (error.status === 400) {
            this.snackBar.openSnackBar(
              'The old password is incorrect. Try again!',
              'close',
              false
            );
          } else
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          this.dialogRef.close();
        },
      });
  }
}
