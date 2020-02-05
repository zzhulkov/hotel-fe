import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from '../../../http.service';
import {TaskManagerComponent} from './task.manager.component';
import {AddTaskDialogComponent} from './add-task-dialog/add-task-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ChangeTaskDialogComponent} from './change-task-dialog/change-task-dialog.component';
import {TaskTableComponent} from "./task-table/taks-table.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {DeleteTaskDialogComponent} from "./delete-task-dialog/delete-task-dialog.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {TextMaskModule} from "angular2-text-mask";
import {NgxMaskModule} from "ngx-mask";
import {AnimationsModule} from "../../../modules/animations/animations.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatPaginatorModule,
        MatTableModule,
        MatExpansionModule,
        TextMaskModule,
        FormsModule,
        NgxMaskModule.forRoot({
            showMaskTyped: true,
        }),
        AnimationsModule
    ],
  declarations: [
    TaskManagerComponent,
    AddTaskDialogComponent,
    ChangeTaskDialogComponent,
    DeleteTaskDialogComponent,
    TaskTableComponent
  ],
  entryComponents: [
    AddTaskDialogComponent,
    ChangeTaskDialogComponent,
  DeleteTaskDialogComponent],
  providers: [HttpService]
})
export class TaskManagerModule {
}

