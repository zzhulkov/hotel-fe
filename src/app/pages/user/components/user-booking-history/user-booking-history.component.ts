import {Component, OnInit} from "@angular/core";
import {Booking} from "../../../../component/booking";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../../../modules/authentication/authentication.service";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ConstantsService} from "../../../../services/constants.service";

const BASE_URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-user-booking-history',
  templateUrl: './user-booking-history.component.html',
  styleUrls: ['./user-booking-history.component.css'],
  providers: [DatePipe]
})
export class UserBookingHistoryComponent implements OnInit {

  currentDate = this.dp.transform(new Date(), 'yyy-MM-dd');
  userBookingsHistory: Booking[];
  reviewForm: FormGroup;

  constructor(private http: HttpClient, private authService: AuthenticationService, private fb: FormBuilder, private dp: DatePipe) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      review: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(300)]]
    });

    this.getBookings();
  }


  deleteBooking(id: number) {
    this.http.delete(BASE_URL + 'bookings/' + id)
      .subscribe(
        data => {
          this.getBookings();
        },
        error1 => {
          console.log(error1);
        }
      );
  }

  sendReview(id: number) {
    this.http.patch(BASE_URL + 'bookings/' + id, {review: this.reviewForm.get('review').value})
      .subscribe(
        data => {
          this.getBookings();
        },
        error1 => {
          console.log(error1);
        }
      );
  }

  getBookings() {
    this.http.get(BASE_URL + 'bookings?user=' + this.authService.currentUserObject.id)
      .subscribe(
        (data: Booking[]) => {
          this.userBookingsHistory =
            data.sort((a: Booking, b: Booking) => {
              return a.startDate === b.startDate ? 0 : (a.startDate > b.startDate ? -1 : 1);
            });
        },
        err => {
          console.log(err);
        }
      );
  }

}
