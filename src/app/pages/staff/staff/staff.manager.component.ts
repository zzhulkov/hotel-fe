import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff.manager.component.html',
  styleUrls: ['./staff.manager.component.css'],
  providers: [HttpService]
})

export class StaffManagerComponent {

}

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-change-stuff',
  templateUrl: './dialog-change-staff.html',
})
export class DialogChangeStuffComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogChangeStuffDialogComponent  );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-change-staff-dialog',
  templateUrl: './dialog-change-staff-dialog.html',
})
export class DialogChangeStuffDialogComponent {}



