import {ChangeDetectorRef, Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeStaffDialogComponent} from './components/change-staff-dialog/change-staff-dialog.component';
import {AddStaffDialogComponent} from './components/add-staff-dialog/add-staff-dialog.component';
import {FormControl} from '@angular/forms';
import {MatExpansionPanel} from "@angular/material/expansion";


@Component({
  selector: 'app-staff-manager',
  templateUrl: './staff-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService],
  viewProviders: [MatExpansionPanel]
})

export class StaffManagerComponent {
  isClicked = false;

  constructor(public dialog: MatDialog, private cdRef: ChangeDetectorRef) {}

  addDialog() {
    const dialogRef = this.dialog.open(AddStaffDialogComponent);

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




