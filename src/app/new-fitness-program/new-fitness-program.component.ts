import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { notEqualToValidator } from '../validators/password.validator';
import { CategoriesService } from '../services/Categories/categories.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { FitnessProgramServiceService } from '../services/FitnessProgramService/fitness-program-service.service';
import { ImageService } from '../services/Image/image.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/TokenService/token-service.service';

@Component({
  selector: 'app-new-fitness-program',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, NgClass],
  templateUrl: './new-fitness-program.component.html',
  styleUrl: './new-fitness-program.component.css',
})
export class NewFitnessProgramComponent {
  selectedImage: File | null = null;
  categories?: any = null;
  name = new FormControl('', [Validators.required]);
  duration = new FormControl(null, [Validators.required]);
  difficulty = new FormControl('default', [
    Validators.required,
    notEqualToValidator('default'),
  ]);
  price = new FormControl(null, [Validators.required]);
  description = new FormControl('', [Validators.required]);
  instructorName = new FormControl('', [Validators.required]);
  instructorSurname = new FormControl('', [Validators.required]);
  instructorContact = new FormControl('', [Validators.required]);
  file = new FormControl('', [Validators.required]);
  location = new FormControl('default', [
    Validators.required,
    notEqualToValidator('default'),
  ]);
  locationLink = new FormControl('', [Validators.required]);
  address = new FormControl('');
  link = new FormControl('');
  category = new FormControl(null as any, [
    Validators.required,
    notEqualToValidator(null),
  ])

  mapAtr: any = [];


  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, private snackBar: CustomSnackBarService,
    private fitnessProgramService: FitnessProgramServiceService, private imageService: ImageService, private router: Router, private tokenService: TokenService) {
    this.categoriesService.findAll().subscribe({
      next: (data) => { this.categories = data }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });
  }

  regex: string = '(?:https?:\\/\\/)?(?:www\\.)?youtu(?:\\.be\\/|be.com\\/\\S*(?:watch|embed)(?:(?:(?=\\/[-a-zA-Z0-9_]{11,}(?!\\S))\\/)|(?:\\S*v=|v\\/)))([-a-zA-Z0-9_]{11,})';
  programForm = this.fb.group({
    name: this.name,
    duration: this.duration,
    difficulty: this.difficulty,
    price: this.price,
    description: this.description,
    instructorName: this.instructorName,
    instructorSurname: this.instructorSurname,
    instructorContact: this.instructorContact,
    location: this.location,
    address: this.address,
    link: this.link,
    category: this.category,
    file: this.file,
    attributes: this.fb.array([]),
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  get attributes() {
    return this.programForm.controls["attributes"] as FormArray;
  }

  onLocationChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'Online') {
      this.address.clearValidators();
      this.link.addValidators([
        Validators.required,
        Validators.pattern(
          this.regex
        ),
      ]);
    } else {
      this.link.clearValidators();
      this.address.addValidators([Validators.required]);
    }
  }

  onCategoryChange() {
    const selectedCategory: any = this.category.value;
    this.attributes.clear();
    let group: any = {};
    selectedCategory.attributes.forEach((attribute: any) => {
      group[attribute.name] = [''];
    });
    let tmpGroup = this.fb.group(group);
    this.attributes.push(tmpGroup);
    this.mapAtr = selectedCategory.attributes;


  }

  onSubmit() {
    this.imageService.uploadImage(this.selectedImage).subscribe({
      next: (data) => {
        let tmp = this.programForm.value;


        let obj: any = {
          name: tmp.name, description: tmp.description, categoryId: tmp.category.id, price: tmp.price,
          duration: tmp.duration, difficulty: tmp.difficulty, location: tmp.location, imageId: data, instructorName: tmp.instructorName,
          instructorSurname: tmp.instructorSurname, instructorContact: tmp.instructorContact
        }
        if (tmp.location === 'Gym' || tmp.location === 'Park')
          obj['locationLink'] = tmp.address;
        else {
          let linkTmp: any = tmp.link;
          const match = linkTmp.match(this.regex);
          let link: any = "";
          if (match) {
            link = match[1];
          }
          obj['locationLink'] = link;
          console.log(link);
          console.log(obj);
        }
        let attributes: any = tmp.attributes ? tmp.attributes[0] : null;
        let mapped = this.mapAtr.map((el: any) => {
          return { id: el.id, value: attributes[el.name] }
        });
        obj['attributes'] = mapped;
        this.fitnessProgramService.insert(this.tokenService.getUser().id, obj).subscribe({
          next: (data) => {
            this.snackBar.openSnackBar(
              'Fitness program successfully created',
              'close',
              true
            );
            this.router.navigate(['/my-programs']);
          }, error: () => {
            this.snackBar.openSnackBar(
              'Error communicating with the server',
              'close',
              false
            );
          }
        });

      }, error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
    });

  }
}
