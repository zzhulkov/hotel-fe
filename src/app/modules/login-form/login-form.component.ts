import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

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
    console.log(this.isValid);
    this.authenticationForm.setErrors(null);
    const login = this.authenticationForm.value.login;
    const password = this.authenticationForm.value.password;
    this.authService.login(login, password);
    this.authService.currentUserObservable.subscribe(user => {
      if (user === null) {
        this.authenticationForm.get('login').setErrors(  {loginError: 'Unknown login/password pair'});
      }
    });
  }
}
