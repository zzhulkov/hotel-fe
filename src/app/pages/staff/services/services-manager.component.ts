import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeServicesDialogComponent} from './components/change-services-dialog/change-services-dialog.component';
import {AddServicesDialogComponent} from './components/add-services-dialog/add-services-dialog.component';
import {DeleteServicesDialogComponent} from './components/delete-services-dialog/delete-services-dialog.component';


@Component({
  selector: 'app-service-manager',
  templateUrl: './services-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class ServicesManagerComponent {
  constructor(public dialog: MatDialog) {
  }

  changeDialog() {
    const dialogRef = this.dialog.open(ChangeServicesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddServicesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteServicesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

