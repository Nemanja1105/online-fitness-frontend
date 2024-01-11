import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loginGuard } from './guards/LoginGuard/login.guard';
import { ActivateComponent } from './activate/activate.component';
import { PageTemplateComponent } from './page-template/page-template.component';
import { FitnessNewsComponent } from './fitness-news/fitness-news.component';
import { ExercisesComponent } from './exercises/exercises.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },
  {
    path: '',
    component: PageTemplateComponent,
    children: [
      { path: 'fitness-news', component: FitnessNewsComponent },
      { path: 'exercises', component: ExercisesComponent },
      { path: '', redirectTo: '/fitness-news', pathMatch: 'full' },
    ],
  },
];
