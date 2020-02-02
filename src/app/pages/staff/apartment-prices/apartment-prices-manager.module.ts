import {BrowserModule} from '@angular/platform-browser';
import {EventEmitter, NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ApartmentPricesManagerComponent} from './apartment-prices-manager.component';
import {ApartmentPricesTableComponent} from './components/apartment-prices-table/apartment-prices-table.component';
import {DeleteApartmentPricesDialogComponent} from './components/delete-apartment-prices-dialog/delete-apartment-prices-dialog.component';
import {ChangeApartmentPricesDialogComponent} from './components/change-apartment-prices-dialog/change-apartment-prices-dialog.component';
import {AddApartmentPricesDialogComponent} from './components/add-apartment-prices-dialog/add-apartment-prices-dialog.component';
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
    ReactiveFormsModule,
    MatExpansionModule
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
    ApartmentPricesManagerComponent,
    ApartmentPricesTableComponent,
    AddApartmentPricesDialogComponent,
    DeleteApartmentPricesDialogComponent,
    ChangeApartmentPricesDialogComponent
  ],
  providers: [HttpService, EventEmitter],
  entryComponents: [
    DeleteApartmentPricesDialogComponent,
    ChangeApartmentPricesDialogComponent,
    AddApartmentPricesDialogComponent
  ],
})
export class ApartmentPricesManagerModule {
}
