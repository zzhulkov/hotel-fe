import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BookingManagerModule} from './booking/booking-manager.module';
import {TaskManagerModule} from './tasks/task.manager.module';
import {StaffComponent} from './staff.component';
import {HttpService} from '../../http.service';
import {RouterModule} from '@angular/router';
import {ApartmentsManagerModule} from './apartments/apartments-manager.module';
import {StaffManagerModule} from './staff/staff-manager.module';
import {ApartmentsClassesManagerModule} from './apartments-classes/apartments-classes-manager.module';
import {UnavailableApartmentsManagerModule} from './unavailable-apartments/unavailable-apartments-manager.module';
import {UserManagerModule} from './user/user-manager.module';
import {ApartmentPricesManagerModule} from './apartment-prices/apartment-prices-manager.module';
import {ServicesManagerModule} from "./services/services-manager.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    ApartmentsManagerModule,
    ApartmentsClassesManagerModule,
    UnavailableApartmentsManagerModule,
    BookingManagerModule,
    ApartmentPricesManagerModule,
    UserManagerModule,
    ServicesManagerModule,
    StaffManagerModule,
    TaskManagerModule,
    RouterModule
  ],
  declarations: [
    StaffComponent
  ],
  exports: [
    StaffComponent
  ],
  providers: [HttpService]
})
export class StaffModule {
}
