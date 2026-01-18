import { Component } from '@angular/core';
import { TextboxComponent } from '../../../components/textbox/textbox.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ZoomDirective } from '../../../directives/zoom.directive';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  imports: [
    TextboxComponent,
    TextboxComponent,
    ReactiveFormsModule,
    ZoomDirective,
    NgIf,
  ],
})
export class LoginComponent {
  formControllerGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isSubmitted = false;

  constructor(private router: Router) {}

  get email() {
    return this.formControllerGroup.get('email') as FormControl;
  }

  get password() {
    return this.formControllerGroup.get('password') as FormControl;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.formControllerGroup.invalid) {
      return;
    }

    localStorage.setItem('token', 'loggedin');
    this.router.navigate(['']);
  }
}
