import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {HttpService} from '../../http.service';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatNativeDateModule, MatInputModule} from '@angular/material';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {NgxTweetModule} from 'ngx-tweet';
import {AuthenticationFormsModule} from '../../modules/authentication-forms.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule,
    MatButtonModule,
    MatCarouselModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxTweetModule,
    AuthenticationFormsModule
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [HttpService]
})
export class UserModule {
}
