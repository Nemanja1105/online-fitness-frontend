import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loginGuard } from './guards/LoginGuard/login.guard';
import { ActivateComponent } from './activate/activate.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'activate', component: ActivateComponent },
];
