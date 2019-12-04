import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {BookingManagerComponent} from './booking-manager.component';
// import {BookingTableComponent} from './components/booking-table/booking-table';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [
    BookingManagerComponent,
    // BookingTableComponent
  ],
  providers: [HttpService]
})
export class BookingManagerModule {
}
