import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from "../../../../services/constants.service";
import {take} from "rxjs/operators";
import {SelectService} from "../../../../services/select.service";
import {Unsubscribable} from "../../../../component/Unsubscribable";


/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-task-dialog',
  styleUrls: ['../../styles/change-dialog.css'],
  templateUrl: './delete-task-dialog.html',
})
export class DeleteTaskDialogComponent extends Unsubscribable {

  deleteTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              public selectService: SelectService) {
    super(selectService);
  }

  deleteApartment() {
    this.selectService.selectAnnounced$
      .pipe(take(1))
      .subscribe( id => {
        this.http.delete(URL + 'tasks/' + id.id)
          .subscribe(res => this.selectService.announceSelect(null));
      });
  }
}



