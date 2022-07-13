import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  emailFormControl = new FormControl(
    '',
    [Validators.required, Validators.email],
  );

  constructor(
    private authService: AuthService,
    private router: Router
    ) {

    }

  passwordFormControl = new FormControl('', [Validators.required]);

  login() {
    console.log("Login!")
    const email = this.emailFormControl.value
    const pwd = this.passwordFormControl.value

    this.authService.login(email ? email : '', pwd ? pwd : '').subscribe(() => {
      this.router.navigateByUrl('/main')
    })
  }
}
