import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeBookingDialogComponent} from './components/change-booking-dialog/change-booking-dialog.component';
import {AddBookingDialogComponent} from './components/add-booking-dialog/add-booking-dialog.component';
import {DeleteBookingDialogComponent} from './components/delete-booking-dialog/delete-booking-dialog.component';


@Component({
  selector: 'app-booking-manager',
  templateUrl: './booking-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class BookingManagerComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ChangeBookingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addApartmentDialog() {
    const dialogRef = this.dialog.open(AddBookingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteApartment() {
    const dialogRef = this.dialog.open(DeleteBookingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

