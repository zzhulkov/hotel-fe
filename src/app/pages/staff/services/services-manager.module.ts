import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ServicesManagerComponent} from './services-manager.component';
import {ServicesTableComponent} from './components/services-table/services-table.component';
import {ChangeServicesDialogComponent} from './components/change-services-dialog/change-services-dialog.component';
import {AddServicesDialogComponent} from './components/add-services-dialog/add-services-dialog.component';
import {DeleteServicesDialogComponent} from './components/delete-services-dialog/delete-services-dialog.component';

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
    ServicesManagerComponent,
    ServicesTableComponent,
    ChangeServicesDialogComponent,
    AddServicesDialogComponent,
    DeleteServicesDialogComponent
  ],
  providers: [HttpService],
  entryComponents: [
    ChangeServicesDialogComponent,
    AddServicesDialogComponent,
    DeleteServicesDialogComponent
  ],
})
export class ServicesManagerModule {
}
