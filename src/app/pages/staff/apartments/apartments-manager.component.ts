import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog-component';


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class ApartmentsManagerComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ChangeApartmentsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

