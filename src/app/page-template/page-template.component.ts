import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatTooltipModule],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.css',
})
export class PageTemplateComponent {}
