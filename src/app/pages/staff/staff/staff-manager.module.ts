import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {StaffManagerComponent} from './staff-manager.component';
import {ChangeStaffDialogComponent} from './components/change-staff-dialog/change-staff-dialog-component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {StaffTableComponent} from './components/staff-table/staff-table.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    StaffManagerComponent, ChangeStaffDialogComponent , StaffTableComponent
  ],
  providers: [HttpService],
  entryComponents: [ ChangeStaffDialogComponent],
})
export class StaffManagerModule {
}
