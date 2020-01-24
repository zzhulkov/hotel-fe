import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Booking} from '../../../../../component/booking';

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
  booking = {} as Booking;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, dataTransfer: DataTransferService) {
    this.booking = dataTransfer.getData();
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
      this.deleteBooking();
    }
  }

  deleteBooking() {
    this.http.delete(URL + 'bookings/' + this.booking.id, this.deleteBookingForm.value).subscribe(
      res => {
        console.log(res);
      });
  }
}



