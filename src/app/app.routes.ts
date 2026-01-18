import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/Login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
