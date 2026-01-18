import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Roflix';

  constructor(private router: Router) {
    const token = localStorage.getItem('token');

    if (!token) {
      router.navigate(['login']);
    }
  }

  get showHeader(): boolean {
    const url = this.router.url || '';
    return !url.startsWith('/login');
  }
}
