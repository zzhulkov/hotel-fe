import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeStaffDialogComponent} from './components/change-staff-dialog/change-staff-dialog-component';


@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff.manager.component.html',
  styleUrls: ['./staff.manager.component.css'],
  providers: [HttpService]
})

export class StaffManagerComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ChangeStaffDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




