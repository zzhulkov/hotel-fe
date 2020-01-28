import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {ChangeServicesDialogComponent} from './components/change-services-dialog/change-services-dialog.component';
import {AddServicesDialogComponent} from './components/add-services-dialog/add-services-dialog.component';
import {DeleteServicesDialogComponent} from './components/delete-services-dialog/delete-services-dialog.component';
import {SelectService} from "../../../services/select.service";
import {Unsubscribable} from "../../../component/Unsubscribable";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-service-manager',
  templateUrl: './services-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class ServicesManagerComponent extends Unsubscribable {
  row$: Observable<any>;
  subscription: Subscription;

  constructor(public dialog: MatDialog, public selectService: SelectService) {
    super(selectService);
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(id => this.row$ = this.selectService.selectAnnounced$);
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddServicesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

