import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ApartmentsManagerComponent} from './apartments-manager.component';
import {AddApartmentsDialogComponent} from './components/add-apartments-dialog/add-apartments-dialog-component';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog-component';
import {ApartmentsTableComponent} from './components/apartments-table/apartments-table.component';
import {MatPaginatorModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MatPaginatorModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    ApartmentsManagerComponent, ApartmentsTableComponent, ChangeApartmentsDialogComponent,
    AddApartmentsDialogComponent
  ],
  providers: [HttpService],
  entryComponents: [ ChangeApartmentsDialogComponent, AddApartmentsDialogComponent],
})
export class ApartmentsManagerModule {
}
