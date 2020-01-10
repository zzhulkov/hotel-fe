import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  authenticationForm: FormGroup;
  authService: AuthenticationService;

  constructor(private fb: FormBuilder, auth: AuthenticationService) {
    this.authService = auth;
  }

  ngOnInit() {
    this.authenticationForm = this.fb.group({
      // TODO: delete values
      login: ['vasja228'],
      password: ['vasja228']
    });
  }

  onSubmit() {
    this.authenticationForm.setErrors(null);
    const login = this.authenticationForm.value.login;
    const password = this.authenticationForm.value.password;
    this.authService.login(login, password);
    this.authService.currentUserObservable.subscribe(user => {
      console.log(user);
      if (user === null) {
        this.authenticationForm.setErrors(  {error: 'Unknown login/password pair'});
      }
    });
  }
}
