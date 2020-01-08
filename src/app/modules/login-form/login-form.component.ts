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
      login: ['login'],
      password: ['pass']
    });
  }

  onSubmit() {
    console.log(this.authenticationForm);
    this.authService.login(this.authenticationForm.value.login, this.authenticationForm.value.password);
  }
}
