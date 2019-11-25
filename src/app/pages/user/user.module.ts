import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {UserComponent} from './user.component';
import {HttpService} from '../../http.service';
import {BookingModule} from './booking/booking.module';
import {ServicesModule} from './services/services.module';
import {ReviewsModule} from './reviews/reviews.module';
import {NgModule} from '@angular/core';
import {HomeModule} from './home/home.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    HomeModule,
    BookingModule,
    ServicesModule,
    ReviewsModule,
    RouterModule
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
