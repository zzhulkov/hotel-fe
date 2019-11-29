import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ApartmentsManagerComponent} from './apartments-manager.component';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog-component';
import {ApartmentsTableComponent} from './components/apartments-table/apartments-table.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule
  ],
  declarations: [
    ApartmentsManagerComponent, ApartmentsTableComponent, ChangeApartmentsDialogComponent
  ],
  providers: [HttpService],
  entryComponents: [ ChangeApartmentsDialogComponent],
})
export class ApartmentsManagerModule {
}
