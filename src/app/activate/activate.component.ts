import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import { CustomSnackBarService } from '../services/CustomSnackBar/custom-snack-bar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css',
})
export class ActivateComponent implements OnInit {
  success: boolean | null = null;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: CustomSnackBarService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      this.authService.activate({ token: data.token }).subscribe({
        next: (res: any) => {
          this.success = res;
        },
        error: () => {
          this.snackBar.openSnackBar(
            'Error communicating with the server',
            'close',
            false
          );
        },
      });
    });
  }
}
