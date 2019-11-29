import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ApartmentsManagerComponent} from './apartments-manager.component';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog-component';
import {ApartmentsTableComponent} from './components/apartments-table/apartments-table.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule
  ],
  declarations: [
    ApartmentsManagerComponent, ApartmentsTableComponent, ChangeApartmentsDialogComponent
  ],
  providers: [HttpService],
  entryComponents: [ ChangeApartmentsDialogComponent],
})
export class ApartmentsManagerModule {
}
