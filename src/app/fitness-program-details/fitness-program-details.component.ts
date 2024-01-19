import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FitnessProgramServiceService } from '../services/FitnessProgramService/fitness-program-service.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { NgClass } from '@angular/common';
import { ImageService } from '../services/Image/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../services/TokenService/token-service.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fitness-program-details',
  standalone: true,
  imports: [NgClass, RouterLink, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './fitness-program-details.component.html',
  styleUrl: './fitness-program-details.component.css'
})
export class FitnessProgramDetailsComponent {
  program: any = null;
  youtubeBase: any = "https://www.youtube.com/embed/";
  youtube: any = null;
  id: any = null;
  comments: any = [];
  clientId: any = null;
  isParticipating: any = true;
  comment = new FormControl('', Validators.required);
  constructor(private ar: ActivatedRoute, private FitnessProgramService: FitnessProgramServiceService, private fb: FormBuilder,
    private imageService: ImageService, private snackBar: CustomSnackBarService, private _sanitizer: DomSanitizer, private jwtService: TokenService) {
    //this.youtube = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubeBase);
    this.clientId = this.jwtService.getUser().id;
    this.ar.params.subscribe(params => {
      this.id = params['id'];
      this.FitnessProgramService.findById(this.id).subscribe({
        next: (data: any) => {
          this.program = data;
          if (data.location == 'Online') {
            this.youtube = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubeBase + data.linkAddress);
          }
          this.FitnessProgramService.isParticipating(this.clientId, this.id).subscribe({
            next: (data) => { this.isParticipating = data; }, error: () => {
              this.snackBar.openSnackBar(
                'Error communicating with the server',
                'close',
                false
              );
            }
          });
          this.FitnessProgramService.getCommentsForFitnessProgram(this.id).subscribe({
            next: (res) => { this.comments = res }, error: () => {
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

  showImageById(item: any) {
    if (item?.sender?.profileImageId)
      return this.imageService.downloadImage(item?.sender?.profileImageId);
    else return '../../assets/victor-freitas-WvDYdXDzkhs-unsplash.jpg';
  }

  onBlur(control: any) {
    control.markAsTouched();
  }

  getFormattedTime = (submittedAt: string): string => {
    const currentTime: Date = new Date();
    const timeDifference: number = Math.floor(
      (currentTime.getTime() - new Date(submittedAt).getTime()) / 1000
    );

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (timeDifference < 60) {
      return rtf.format(-timeDifference, "second");
    } else if (timeDifference < 3600) {
      return rtf.format(-Math.floor(timeDifference / 60), "minute");
    } else if (timeDifference < 86400) {
      return rtf.format(-Math.floor(timeDifference / 3600), "hour");
    } else if (timeDifference < 86400 * 2) {
      return rtf.format(-1, "day");
    } else {
      const daysAgo = Math.floor(timeDifference / 86400);
      return rtf.format(-daysAgo, "day");
    }
  };


  /*
 error: () => {
        this.snackBar.openSnackBar(
          'Error communicating with the server',
          'close',
          false
        );
      }
  */
  saveComment() {
    let tmp: any = this.comment.value;
    let clientId = this.jwtService.getUser().id;
    let obj = { comment: tmp, fitnessProgramId: this.id, senderId: clientId }
    this.FitnessProgramService.commentFitnessProgram(this.id, obj).subscribe({
      next: (data) => {
        this.comments.unshift(data);
        this.comment.reset();
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
