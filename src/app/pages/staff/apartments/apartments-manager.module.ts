import {BrowserModule} from '@angular/platform-browser';
import {EventEmitter, NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ApartmentsManagerComponent} from './apartments-manager.component';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog.component';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {ApartmentsTableComponent} from './components/apartments-table/apartments-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCheckboxModule} from "@angular/material/checkbox";


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
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule
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
    AddApartmentsDialogComponent, DeleteApartmentsDialogComponent
  ],
  providers: [HttpService, EventEmitter],
  entryComponents: [ ChangeApartmentsDialogComponent, AddApartmentsDialogComponent, DeleteApartmentsDialogComponent],
})
export class ApartmentsManagerModule {
}
