import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {HttpService} from '../../../http.service';
import {ChangeApartmentsDialogComponent} from './components/change-apartment-dialog/change-apartments-dialog.component';
import {AddApartmentsDialogComponent} from './components/add-apartment-dialog/add-apartments-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteApartmentsDialogComponent} from './components/delete-apartment-dialog/delete-apartments-dialog.component';
import {SelectService} from "../../../services/select.service";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-apartments-manager',
  templateUrl: './apartments-manager.component.html',
  styleUrls: ['../styles/page.css'],
  // providers: [HttpService],
  // viewProviders: [MatExpansionPanel]
})

export class ApartmentsManagerComponent implements OnInit, OnDestroy {
  changeApps = ['Done', 'None'];
  @Input() isClicked: string;
  clickRow: boolean;
  subscription: Subscription;
  changeApp: any;
  id$: Observable<string>;

  constructor(public dialog: MatDialog, private missionService: SelectService, private ckRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.id$ = this.missionService.missionAnnounced$;
  }

  Clicking() {
      // tslint:disable-next-line:triple-equals
      if (this.isClicked === 'Done') {
        console.log('select');
        return true;
        // tslint:disable-next-line:triple-equals
      } else if (this.isClicked === 'None') {
        console.log('Destroy');
        return true;
      }
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
    this.subscription.unsubscribe();
  }
}

