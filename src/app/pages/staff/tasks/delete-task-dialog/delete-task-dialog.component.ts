import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from "../../../../services/constants.service";


/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-task-dialog',
  styleUrls: ['../../styles/change-dialog.css'],
  templateUrl: './delete-task-dialog.html',
})
export class DeleteTaskDialogComponent implements OnInit {

  deleteTaskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.deleteTaskForm = this.formBuilder.group({
      id: ['', Validators.pattern('^\\d{1,3}$')]
    });
  }

  checkValid() {
    this.deleteTaskForm.markAllAsTouched();
    console.log('FormGroup: ', this.deleteTaskForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.deleteTaskForm.valid ;
  }

  onSubmit() {
    if (this.deleteTaskForm.valid) {
      console.log(this.deleteTaskForm.value);
      this.deleteApartment();
    }
  }

  deleteApartment() {
    this.http.delete(URL + 'booking/' + this.deleteTaskForm.value.id, this.deleteTaskForm.value).subscribe(
      res => {
        console.log(res);
      });
  }
}



