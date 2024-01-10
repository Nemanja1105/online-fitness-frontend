import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { confirmPasswordValidator } from '../validators/password.validator';
import { NgClass } from '@angular/common';
import { AuthService } from '../services/Auth/auth.service';
import { ImageService } from '../services/Image/image.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
  ]);
  repeatPassword = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'),
    // Validators.minLength(8),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
    Validators.email,
  ]);
  name = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  surname = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  city = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  image = new FormControl(null);
  usernameValid = true;
  emailValid = true;
  selectedImage: File | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private imageService: ImageService,
    private snackBar: CustomSnackBarService,
    private router: Router
  ) {}
  profileForm = this.fb.group(
    {
      username: this.username,
      password: this.password,
      repeatPassword: this.repeatPassword,
      email: this.email,
      name: this.name,
      surname: this.surname,
      city: this.city,
      image: this.image,
    },
    { validators: confirmPasswordValidator }
  );

  onBlur(control: any) {
    control.markAsTouched();
  }

  onBlurUsername() {
    this.username.markAsTouched();
    if (this.username.valid) {
      this.authService
        .checkDetail({ column: 'username', value: this.username.value })
        .subscribe({
          next: (response) => {
            this.usernameValid = !response;
          },
          error: (error) => {},
        });
    }
  }

  onBlurEmail() {
    this.email.markAsTouched();
    if (this.email.valid) {
      this.authService
        .checkDetail({ column: 'email', value: this.email.value })
        .subscribe({
          next: (response) => {
            this.emailValid = !response;
          },
          error: (error) => {},
        });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit() {
    if (this.selectedImage) {
      this.imageService.uploadImage(this.selectedImage).subscribe({
        next: (data) => {
          this.registerClient({
            username: this.username.value,
            password: this.password.value,
            repeatPassword: this.repeatPassword.value,
            email: this.email.value,
            name: this.name.value,
            surname: this.surname.value,
            city: this.city.value,
            profileImageId: data,
          });
        },
        error: () => {},
      });
    } else {
      this.registerClient({
        username: this.username.value,
        password: this.password.value,
        repeatPassword: this.repeatPassword.value,
        email: this.email.value,
        name: this.name.value,
        surname: this.surname.value,
        city: this.city.value,
      });
    }
  }

  registerClient(obj: any) {
    this.authService.register(obj).subscribe({
      next: () => {
        this.snackBar.openSnackBar('Registracija uspjesna', 'close', true);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.snackBar.openSnackBar(
          'Desila se greska prilikom komunikacije sa serverom',
          'close',
          false
        );
      },
    });
  }
}
