import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {HttpService} from '../../../http.service';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog.component';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {SelectService} from "../../../services/select.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
   providers: [HttpService],
   viewProviders: [MatExpansionPanel]
})

export class ApartmentsManagerComponent implements OnInit, OnDestroy {
  id$: Observable<string>;
  subscription: Subscription;

  constructor(public dialog: MatDialog, private missionService: SelectService) {
  }

  ngOnInit(): void {
    this.subscription = this.missionService.missionAnnounced$.subscribe(id => this.id$ = this.missionService.missionAnnounced$);
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
    this.missionService.announceMission(null);
    this.subscription.unsubscribe();
  }
}

