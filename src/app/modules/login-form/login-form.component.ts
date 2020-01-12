import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {error} from "selenium-webdriver";
import {combineAll} from "rxjs/operators";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private authenticationForm: FormGroup;
  private isValid: boolean;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationForm = this.fb.group({
      // TODO: delete values
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    return this.authenticationForm.get('login');
  }

  password() {
    return this.authenticationForm.get('password');
  }

  onChange() {
    let tmp = true;
    for (let key in this.authenticationForm.controls) {
      tmp = tmp && this.authenticationForm.get(key).errors === null;
    }
    this.isValid = tmp;
  }

  onSubmit() {
    if (this.isValid) {
      this.authService.login(this.authenticationForm.value.login, this.authenticationForm.value.password)
          .subscribe(
            code => {
              if (code === 2)
                this.login().setErrors({loginError: 'Unknown login/password combination'});
            });
    }
  }
}
