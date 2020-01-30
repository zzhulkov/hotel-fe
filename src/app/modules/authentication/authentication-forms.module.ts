import {LoginFormComponent} from './login-form/login-form.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent
  ],
  exports: [
    LoginFormComponent,
    RegistrationFormComponent
  ]
})
export class AuthenticationFormsModule {
}
