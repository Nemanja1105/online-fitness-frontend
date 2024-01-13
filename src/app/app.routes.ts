import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loginGuard } from './guards/LoginGuard/login.guard';
import { ActivateComponent } from './activate/activate.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { FitnessNewsComponent } from './fitness-news/fitness-news.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProfileComponent } from './profile/profile.component';
import { mainGuard } from './guards/MainGuard/main.guard';
import { FitnessProgramsComponent } from './fitness-programs/fitness-programs.component';
import { MyFitnessProgramsComponent } from './my-fitness-programs/my-fitness-programs.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },
  {
    path: '',
    component: PageTemplateComponent,
    children: [
      { path: 'fitness-news', component: FitnessNewsComponent },
      {
        path: 'exercises',
        component: ExercisesComponent,
        canActivate: [mainGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [mainGuard],
      },
      { path: 'programs', component: FitnessProgramsComponent },
      {
        path: 'my-programs',
        component: MyFitnessProgramsComponent,
        canActivate: [mainGuard],
      },
      { path: '', redirectTo: '/fitness-news', pathMatch: 'full' },
    ],
  },
];

export const PUBLIC_ROUTE = ['fitness-news', 'programs'];
