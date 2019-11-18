import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BookingComponent} from './booking.component';
import {ApartmentClassComponent} from './components/apartmentClass/apartmentClass.component';
import {HttpService} from '../../../http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [
    ApartmentClassComponent, BookingComponent
  ],
  providers: [HttpService]
})
export class BookingModule {
}
