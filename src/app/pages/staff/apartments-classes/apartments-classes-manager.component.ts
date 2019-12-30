import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {ChangeApartmentsClassesDialogComponent} from './components/change-apartment-class-dialog/change-apartments-classes-dialog.component';
import {AddApartmentsClassesDialogComponent} from './components/add-apartment-class-dialog/add-apartments-classes-dialog.component';
// tslint:disable-next-line:max-line-length
import {DeleteApartmentsClassesDialogComponent} from './components/delete-apartment-class-dialog/delete-apartments-classes-dialog.component';


@Component({
  selector: 'app-apartments-classes-manager',
  templateUrl: './apartments-classes-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class ApartmentsClassesManagerComponent {
  constructor(public dialog: MatDialog) {}

  changeDialog() {
    const dialogRef = this.dialog.open(ChangeApartmentsClassesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  addDialog() {
    const dialogRef = this.dialog.open(AddApartmentsClassesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteApartmentsClassesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

