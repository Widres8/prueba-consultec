import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services';
import { User } from '@shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  showPassword: boolean = false;
  validCredentials: boolean = true;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  async onSubmit() {
    const { username, password }: User = this.form.value;
    const user = await this.authService.login();
    if (
      username.toLowerCase() === user.username.toLowerCase() &&
      password === user.password
    ) {
      this.router.navigate(['/home']);
    } else {
      this.validCredentials = false;
    }
  }

  resetUserValidation() {
    this.validCredentials = true;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
