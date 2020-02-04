import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {take} from 'rxjs/operators';
import {SelectService} from '../../../../../services/select.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-unavailable-apartment-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-unavailable-apartment-dialog.html',
})
export class DeleteUnavailableApartmentDialogComponent {

  constructor(private http: HttpClient, private selectService: SelectService) {
  }

  deleteUnavailableApartment() {
    this.selectService.selectAnnounced$
      .pipe(take(1))
      .subscribe(id => {
        this.http.delete(URL + 'unavailableApartments/' + id.id)
          .subscribe(res => this.selectService.announceSelect(null));
      });
  }
}



