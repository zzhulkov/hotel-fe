import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';
import {AddApartmentPricesDialogComponent} from './components/add-apartment-prices-dialog/add-apartment-prices-dialog.component';
import {SelectService} from '../../../services/select.service';
import {Observable, Subscription} from 'rxjs';
import {Unsubscribable} from '../../../component/Unsubscribable';


@Component({
  selector: 'app-apartment-prices-manager',
  templateUrl: './apartment-prices-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class ApartmentPricesManagerComponent extends Unsubscribable implements OnInit {
  id$: Observable<string>;
  subscription: Subscription;

  constructor(public dialog: MatDialog, public selectService: SelectService) {
    super(selectService);
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(id => this.id$ = this.selectService.selectAnnounced$);
  }

  ngOnInit(): void {
  }

  addApartmentPriceDialog() {
    const dialogRef = this.dialog.open(AddApartmentPricesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

