import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {StaffManagerComponent, DialogChangeStuffDialogComponent} from './staff.manager.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    MatSelectModule
  ],
  declarations: [
    StaffManagerComponent, DialogChangeStuffDialogComponent ,
  ],
  providers: [HttpService],
  entryComponents: [ DialogChangeStuffDialogComponent],
})
export class StaffManagerModule {
}
