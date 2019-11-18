import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpService} from './http.service';
import {BookingModule} from './pages/user/booking/booking.module';
import {HomeModule} from './pages/user/home/home.module';
import {ReviewsModule} from './pages/user/reviews/reviews.module';
import {ServicesModule} from './pages/user/services/services.module';
import {StaffModule} from './pages/staff/staff.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    AppRoutingModule,
    BookingModule,
    HomeModule,
    ReviewsModule,
    ServicesModule,
    StaffModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
