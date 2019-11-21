import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {StaffManagerComponent, DialogChangeStuffComponent, DialogChangeStuffDialogComponent} from './staff.manager.component';
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
    StaffManagerComponent,[DialogChangeStuffComponent, DialogChangeStuffDialogComponent],
  ],
  bootstrap: [DialogChangeStuffComponent],
  providers: [HttpService],
  entryComponents: [DialogChangeStuffComponent, DialogChangeStuffDialogComponent],
})
export class StaffManagerModule {
}
