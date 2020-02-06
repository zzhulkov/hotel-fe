import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from "../../../../services/constants.service";
import {take} from "rxjs/operators";
import {SelectService} from "../../../../services/select.service";
import {Unsubscribable} from "../../../../component/Unsubscribable";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";


/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-task-dialog',
  styleUrls: ['../../styles/change-dialog.css'],
  templateUrl: './delete-task-dialog.html',
})
export class DeleteTaskDialogComponent {

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              public selectService: SelectService,
              private snackBar: MatSnackBar,
              private matDialogRef: MatDialogRef<DeleteTaskDialogComponent>) {
  }

  deleteTask() {
    this.selectService.selectAnnounced$
      .pipe(take(2))
      .subscribe(id => {
        this.http.delete(URL + 'tasks/' + id.id)
          .subscribe(res => {
            this.snackBar.open('Delete succeeded!', 'Ok', {duration: 8000});
            this.selectService.announceSelect(null);
            this.matDialogRef.close();
          }, error => {
            console.log(error);
            this.matDialogRef.close();
            this.snackBar.open('Error: '.concat(error.error), 'Ok', {duration: 8000});
          });
      });
  }
}



