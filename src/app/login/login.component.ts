import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AbstractControl, FormBuilder, Validators,FormGroup, FormControl,ReactiveFormsModule } from "@angular/forms";
import {NgClass,NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder) {
  }


  loginForm = this.formBuilder.group({
    email: [undefined,[Validators.email, Validators.required]],
    password: [null, [Validators.required]]
  })

  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
