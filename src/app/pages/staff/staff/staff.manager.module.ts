import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {StaffManagerComponent} from './staff.manager.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule
  ],
  declarations: [
    StaffManagerComponent
  ],
  providers: [HttpService]
})
export class StaffManagerModule {
}
