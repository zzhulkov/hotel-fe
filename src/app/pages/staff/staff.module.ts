import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BookingManagerModule} from './booking/booking.manager.module';
import {ServicesManagerModule} from './services/services.manager.module';
import {TaskManagerModule} from './tasks/task.manager.module';
import {StaffComponent} from './staff.component';
import {StaffManagerModule} from './staff/staff.manager.module';
import {ApartmentsManagerModule} from './apartments/apartments.manager.module';
import {HttpService} from '../../http.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    ApartmentsManagerModule,
    BookingManagerModule,
    ServicesManagerModule,
    StaffManagerModule,
    TaskManagerModule
  ],
  declarations: [
    StaffComponent
  ],
  providers: [HttpService]
})
export class StaffModule {
}
