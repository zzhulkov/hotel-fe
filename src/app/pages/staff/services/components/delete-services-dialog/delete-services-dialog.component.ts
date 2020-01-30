import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {SelectService} from "../../../../../services/select.service";
import {take} from "rxjs/operators";


/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-services-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-services-dialog.html',
})
export class DeleteServicesDialogComponent {

  constructor(private http: HttpClient, private selectService: SelectService) {
  }

  deleteService() {
    this.selectService.selectAnnounced$
      .pipe(take(1))
      .subscribe(id => {
        this.http.delete(URL + 'bookingAddServices/' + id.id)
          .subscribe(res => this.selectService.announceSelect(null));
      });
  }
}



