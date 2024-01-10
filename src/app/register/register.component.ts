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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
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
  email = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  name = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  surname = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  city = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  image = new FormControl(null);
  constructor(private fb: FormBuilder) {}
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
}
