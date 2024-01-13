import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { TokenService } from '../services/TokenService/token-service.service';
import { ImageService } from '../services/Image/image.service';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatTooltipModule],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.css',
})
export class PageTemplateComponent {
  isLoggin = false;
  

  constructor(
    private tokenService: TokenService,
    private imageService: ImageService,
    private router: Router
  ) {
    this.isLoggin = tokenService.isLoggin();
  }

  showImage() {
    let user = this.tokenService.getUser();
    if (user.profileImageId)
      return this.imageService.downloadImage(user.profileImageId);
    else return '../../assets/profileIcon.png';
  }

  logClick() {
    if (this.isLoggin) {
      this.tokenService.logout();
    }
    this.router.navigate(['/login']);
  }
}
