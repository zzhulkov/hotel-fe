import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {ChangeApartmentsClassesDialogComponent} from './components/change-apartment-class-dialog/change-apartments-classes-dialog.component';
import {AddApartmentsClassesDialogComponent} from './components/add-apartment-class-dialog/add-apartments-classes-dialog.component';
// tslint:disable-next-line:max-line-length
import {DeleteApartmentsClassesDialogComponent} from './components/delete-apartment-class-dialog/delete-apartments-classes-dialog.component';
import {MatExpansionPanel} from "@angular/material/expansion";


@Component({
  selector: 'app-apartments-classes-manager',
  templateUrl: './apartments-classes-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService],
  viewProviders: [MatExpansionPanel]
})

export class ApartmentsClassesManagerComponent {
  isClicked = false;

  constructor(public dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {}

  isClickedRow() {
    this.isClicked = true;
    this.cdRef.detectChanges();
  }

  reselectRow() {
    this.isClicked = false;
    this.cdRef.detectChanges();
    console.log('reselect');
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

