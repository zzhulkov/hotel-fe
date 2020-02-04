import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {User} from '../../../component/user';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Unsubscribable} from "../../../component/Unsubscribable";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  private registrationForm: FormGroup;
  private isValid: boolean;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      login: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.pattern('(\\w|_|\\d)+')]],
      password: ['', [Validators.minLength(8), Validators.maxLength(30), Validators.pattern('(\\w|_|\\d)+')]],
      firstname: ['', [Validators.required, Validators.pattern('(\\w|`| )+')]],
      lastname: ['', [Validators.required, Validators.pattern('(\\w|`| )+')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('\\+?(-|\\d)+')]]
    });
  }

  login() {
    return this.registrationForm.get('login');
  }

  password() {
    return this.registrationForm.get('password');
  }

  firstname() {
    return this.registrationForm.get('firstname');
  }

  lastname() {
    return this.registrationForm.get('lastname');
  }

  email() {
    return this.registrationForm.get('email');
  }

  phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  onChange() {
    let tmp = true;
    for (let key in this.registrationForm.controls) {
      tmp = tmp && this.registrationForm.get(key).errors === null;
    }
    this.isValid = tmp;
  }

  onSubmit() {
    if (!this.isValid) {
      return;
    }

    const user: User =  this.registrationForm.value;
    user.userRole = 'Client';
    console.log(user);
    this.authService.registration(user)
      .subscribe(data => {
        if (data !== null) {
          this.isValid = false;
          this.registrationForm.get(data).setErrors({unique: 'reserved'});
        }
      });
  }



}
