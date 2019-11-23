import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {StaffManagerComponent} from './staff.manager.component';
import {ChangeStuffDialogComponent} from './components/change-staff-dialog/change-staff-dialog-component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
    StaffManagerComponent, ChangeStuffDialogComponent ,
  ],
  providers: [HttpService],
  entryComponents: [ ChangeStuffDialogComponent],
})
export class StaffManagerModule {
}
