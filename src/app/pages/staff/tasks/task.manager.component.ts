import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from "@angular/material/dialog";
import {AddTaskDialogComponent} from "./add-task-dialog/add-task-dialog.component";


@Component({
  selector: 'app-staff-tasks',
  templateUrl: './task.manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class TaskManagerComponent {
  isClicked = false;

  constructor(public dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  addDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isClickedRow() {
    this.isClicked = true;
    this.cdRef.detectChanges();
  }

  reselectRow() {
    this.isClicked = false;
    this.cdRef.detectChanges();
    console.log('reselect');
  }
}

