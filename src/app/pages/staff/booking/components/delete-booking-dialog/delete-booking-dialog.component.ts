import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {take} from "rxjs/operators";
import {SelectService} from "../../../../../services/select.service";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-booking-dialog.html',
})
export class DeleteBookingDialogComponent {

  constructor(private http: HttpClient, private selectService: SelectService) {
  }

  deleteBooking() {
    this.selectService.selectAnnounced$
      .pipe(take(1))
      .subscribe(id => {
        this.http.delete(URL + 'bookings/' + id.id)
          .subscribe(res => this.selectService.announceSelect(null));
      });
  }
}



