import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenService } from '../services/TokenService/token-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../components/change-password-dialog/change-password-dialog.component';
import { NgClass } from '@angular/common';
import { ClientService } from '../services/Client/client.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { ImageService } from '../services/Image/image.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTooltipModule, ReactiveFormsModule, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  isEdit = false;
  user: any = null;
  selectedImage: File | null = null;
  name = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  surname = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.maxLength(255),
    Validators.email,
  ]);
  city = new FormControl('', [Validators.required, Validators.maxLength(255)]);

  constructor(
    private jwtService: TokenService,
    public dialog: MatDialog,
    private clientService: ClientService,
    private snackBar: CustomSnackBarService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.user = this.jwtService.getUser();
    if (this.user) {
      this.name.setValue(this.user.name);
      this.surname.setValue(this.user.surname);
      this.email.setValue(this.user.email);
      this.city.setValue(this.user.city);
      this.email.disable();
      this.disableComponents();
    }
  }

  onEditClick() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) this.enableComponents();
    else {
      this.disableComponents();
      this.initForm();
    }
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  disableComponents() {
    this.name.disable();
    this.surname.disable();
    //this.email.disable();
    this.city.disable();
  }

  enableComponents() {
    this.name.enable();
    this.surname.enable();
    //this.email.enable();
    this.city.enable();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  openDialog() {
    this.dialog.open(ChangePasswordDialogComponent, { maxWidth: '380px' });
  }

  onSubmit() {
    if (this.selectedImage) {
      this.imageService.uploadImage(this.selectedImage).subscribe({
        next: (data) => {
          this.updateProfile({
            name: this.name.value,
            surname: this.surname.value,
            city: this.city.value,
            profileImageId: data,
          });
        },
        error: () => {
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
        },
      });
    } else {
      this.updateProfile({
        name: this.name.value,
        surname: this.surname.value,
        city: this.city.value,
      });
    }
  }

  showImage() {
    if (this.user.profileImageId)
      return this.imageService.downloadImage(this.user.profileImageId);
    else return '../../assets/profileIcon.png';
  }

  updateProfile(request: any) {
    let id = this.jwtService.getUser().id;
    this.clientService.updateClient(request, id).subscribe({
      next: (data) => {
        this.jwtService.updateUser(data);
        this.onEditClick();
        this.snackBar.openSnackBar(
          'Client account successfully updated',
          'close',
          true
        );
        window.location.href = '/profile';
      },
      error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      },
    });
  }
}
