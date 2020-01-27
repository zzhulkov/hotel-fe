import {Component, OnDestroy, OnInit} from '@angular/core';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {SelectService} from "../../../services/select.service";
import {Observable, Subscription} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
   viewProviders: [MatExpansionPanel]
})

export class ApartmentsManagerComponent implements OnInit, OnDestroy {
  id$: Observable<string>;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private selectService: SelectService) {
    this.subscription = this.selectService.missionAnnounced$
      .subscribe(id => this.id$ = this.selectService.missionAnnounced$);
  }

  ngOnInit(): void {
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


  ngOnDestroy(): void {
    console.log('destroy apartment');
    this.subscription.unsubscribe();
    if (this.subscription) {
      this.selectService.announceMission(null);
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

