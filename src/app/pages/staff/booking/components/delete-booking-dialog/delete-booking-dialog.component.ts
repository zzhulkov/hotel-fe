import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-booking-dialog.html',
})
export class DeleteBookingDialogComponent implements OnInit {

  deleteBookingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.deleteBookingForm = this.formBuilder.group({
      id: ['', Validators.pattern('^\\d{1,3}$')]
    });
  }

  checkValid() {
    this.deleteBookingForm.markAllAsTouched();
    console.log('FormGroup: ', this.deleteBookingForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.deleteBookingForm.valid ;
  }

  onSubmit() {
    if (this.deleteBookingForm.valid) {
      console.log(this.deleteBookingForm.value);
      this.deleteApartment();
    }
  }

  deleteApartment() {
    this.http.delete(URL + 'booking/' + this.deleteBookingForm.value.id, this.deleteBookingForm.value).subscribe(
      res => {
        console.log(res);
      });
  }
}



