import { Component } from '@angular/core';
import { FitnessProgramServiceService } from '../services/FitnessProgramService/fitness-program-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { TokenService } from '../services/TokenService/token-service.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})

export class SubscribeComponent {

  program: any = null;
  paymentType: any = null;
  id: any = null;
  constructor(private fb: FormBuilder, private router: Router, private jwtService: TokenService, private fitnessProgramService: FitnessProgramServiceService, private ar: ActivatedRoute, private snackBar: CustomSnackBarService) {
    this.ar.params.subscribe(params => {
      this.id = params['id'];
      this.fitnessProgramService.findById(this.id).subscribe({
        next: (data: any) => {
          this.program = data;
        }, error: () => {
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
        }
      });
    });
  }
  text = new FormControl('', Validators.required);
  form = this.fb.group({ text: this.text, flexRadioDefault: [null, Validators.required] });

  onBlur(control: any) {
    control.markAsTouched();
  }

  onRadioChange(type: any) {
    if (type === 'location')
      this.text.setValue("1");
    else
      this.text.reset();
  }

  onFinish() {
    let clientId = this.jwtService.getUser().id;
    this.fitnessProgramService.participateToFitnessProgram(clientId, this.id).subscribe({
      next: () => {
        this.snackBar.openSnackBar(
          'Client has successfully purchased the program',
          'close',
          true
        );
        setTimeout(() => { this.router.navigate(['/fitness-program', this.id]); }, 1000);

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
