import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeStaffDialogComponent} from './components/change-staff-dialog/change-staff-dialog.component';
import {AddStaffDialogComponent} from './components/add-staff-dialog/add-staff-dialog.component';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class StaffManagerComponent {
  constructor(public dialog: MatDialog) {}

  addDialog() {
    const dialogRef = this.dialog.open(AddStaffDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeDialog() {
    const dialogRef = this.dialog.open(ChangeStaffDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




