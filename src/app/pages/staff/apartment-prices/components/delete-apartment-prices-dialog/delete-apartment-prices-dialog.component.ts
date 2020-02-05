import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {take} from 'rxjs/operators';
import {SelectService} from '../../../../../services/select.service';
import {MatSnackBar} from "@angular/material/snack-bar";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-apartment-prices-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-apartment-prices-dialog.html',
})
export class DeleteApartmentPricesDialogComponent {

  constructor(private http: HttpClient, private selectService: SelectService,
              private snackBar: MatSnackBar) {
  }

  deleteApartmentPrice() {
    this.selectService.selectAnnounced$
      .pipe(take(1))
      .subscribe(id => {
        this.http.delete(URL + 'apartmentPrices/' + id.id)
          .subscribe(res => {
            this.snackBar.open('Delete successful', 'Ok', {duration: 6000});
            this.selectService.announceSelect(null); });
      },
        error => {
        this.snackBar.open('Delete denied', 'Ok', {duration: 6000});
        });
  }
}



