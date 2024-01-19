import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FitnessProgramServiceService } from '../services/FitnessProgramService/fitness-program-service.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { NgClass } from '@angular/common';
import { ImageService } from '../services/Image/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../services/TokenService/token-service.service';

@Component({
  selector: 'app-fitness-program-details',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './fitness-program-details.component.html',
  styleUrl: './fitness-program-details.component.css'
})
export class FitnessProgramDetailsComponent {
  program: any = null;
  youtubeBase: any = "https://www.youtube.com/embed/";
  youtube: any = null;
  isParticipating: any = true;
  constructor(private ar: ActivatedRoute, private FitnessProgramService: FitnessProgramServiceService,
    private imageService: ImageService, private snackBar: CustomSnackBarService, private _sanitizer: DomSanitizer, private jwtService: TokenService) {
    //this.youtube = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubeBase);
    let clientId = this.jwtService.getUser().id;
    this.ar.params.subscribe(params => {
      let id: any = params['id'];
      this.FitnessProgramService.findById(id).subscribe({
        next: (data: any) => {
          this.program = data;
          if (data.location == 'Online') {
            this.youtube = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubeBase + data.linkAddress);
          }
          this.FitnessProgramService.isParticipating(clientId, id).subscribe({
            next: (data) => { this.isParticipating = data; }, error: () => {
              this.snackBar.openSnackBar(
                'Error communicating with the server',
                'close',
                false
              );
            }
          })
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
  showImage() {
    if (this.program?.imageId)
      return this.imageService.downloadImage(this.program?.imageId);
    else return '../../assets/victor-freitas-WvDYdXDzkhs-unsplash.jpg';
  }
}
