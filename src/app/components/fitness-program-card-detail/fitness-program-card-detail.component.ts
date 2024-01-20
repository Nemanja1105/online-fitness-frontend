import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { ImageService } from '../../services/Image/image.service';

@Component({
  selector: 'app-fitness-program-card-detail',
  standalone: true,
  imports: [MatTooltipModule, RouterLink, NgClass],
  templateUrl: './fitness-program-card-detail.component.html',
  styleUrl: './fitness-program-card-detail.component.css'
})
export class FitnessProgramCardDetailComponent {
  @Input() program: any;

  constructor(private router: Router, private imageService: ImageService) { }

  locationIcon() {
    if (this.program?.location === "Online")
      return "../../../assets/onlineIcon.png";
    else if (this.program?.location === "Gym")
      return "../../../assets/gymIcon.png";
    else
      return "../../../assets/parkIcon.png";
  }

  onCardClick() {
    this.router.navigate(['/fitness-program', this.program?.id]);
  }

  showImage() {
    if (this.program?.imageId)
      return this.imageService.downloadImage(this.program?.imageId);
    else return '../../assets/victor-freitas-WvDYdXDzkhs-unsplash.jpg';
  }

}
