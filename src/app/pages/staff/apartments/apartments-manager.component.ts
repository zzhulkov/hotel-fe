import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {SelectService} from "../../../services/select.service";
import {Observable, Subscription} from "rxjs";
import {MatExpansionPanel} from "@angular/material/expansion";
import {first} from "rxjs/operators";
import {stringify} from "querystring";


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
   viewProviders: [MatExpansionPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ApartmentsManagerComponent implements OnInit, OnDestroy {
  id$: Observable<string>;
  str: string;
  subscription$: Subscription;

  constructor(public dialog: MatDialog, private selectService: SelectService, private changeDetection: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.subscription$ = this.selectService.missionAnnounced$
      .subscribe(id =>  { this.str = id; this.id$ =  this.selectService.missionAnnounced$; } );
  }

  addApartmentDialog() {
    const dialogRef = this.dialog.open(AddApartmentsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  isClicked(id$: Observable<string>): boolean {
    id$.subscribe(res => this.str = res);
    return this.isValid(this.str);
  }
  isValid(id: string): boolean {
    return id != null;
  }

  deleteApartment() {
    const dialogRef = this.dialog.open(DeleteApartmentsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnDestroy(): void {
    console.log('destroy apartment');
    this.subscription$.unsubscribe();
    if (this.subscription$) {
      this.selectService.announceMission(null);
      this.subscription$.unsubscribe();
      this.subscription$ = null;
    }
  }
}

