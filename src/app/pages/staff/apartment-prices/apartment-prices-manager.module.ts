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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule,
  NativeDateAdapter
} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";


export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return date.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};

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
        MatDatepickerModule,
      MatSnackBarModule
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
  providers: [HttpService, EventEmitter,
    MatDatepickerModule,
    MatSnackBar,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}],
  entryComponents: [
    DeleteApartmentPricesDialogComponent,
    ChangeApartmentPricesDialogComponent,
    AddApartmentPricesDialogComponent
  ],
})
export class ApartmentPricesManagerModule {
}
