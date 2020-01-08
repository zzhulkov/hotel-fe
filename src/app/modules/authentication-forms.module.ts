import {LoginFormComponent} from './login-form/login-form.component';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [
    LoginFormComponent,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class AuthenticationFormsModule {
}
