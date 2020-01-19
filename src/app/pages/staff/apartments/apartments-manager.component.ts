import {ChangeDetectorRef, Component, ViewChildren} from '@angular/core';
import {HttpService} from '../../../http.service';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog.component';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {ApartmentsTableComponent} from './components/apartments-table/apartments-table.component';
import {FormControl} from '@angular/forms';
import {MatExpansionPanel} from '@angular/material/expansion';


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService],
  viewProviders: [MatExpansionPanel]
})

export class ApartmentsManagerComponent {
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

  addApartmentDialog() {
    const dialogRef = this.dialog.open(AddApartmentsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteApartment() {
    const dialogRef = this.dialog.open(DeleteApartmentsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

