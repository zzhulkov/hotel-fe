import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatHorizontalStepper} from '@angular/material';
import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../component/apartments-class';
import {Apartments} from '../../../../component/apartments';
import {Booking} from "../../../../component/booking";
import {AuthenticationService} from "../../../../modules/authentication/authentication.service";
import {User} from "../../../../component/user";
import {BookingAddService} from "../../../../component/bookingAddService";

@Component({
  selector: 'app-booking-creator',
  templateUrl: './booking-creator.component.html',
  styleUrls: ['./booking-creator.component.css'],
  providers: [DatePipe]
})
export class BookingCreatorComponent implements OnInit {
  @Input() sDate: string;
  @Input() eDate: string;

  // Common
  private currentBooking: Booking;
  // FirstStep
  private freeapartmentClasses: FreeApartments[];
  private datesForm: FormGroup;
  private isDatesFromComplete = false;
  private minDate = new Date();
  private maxDate = new Date().setFullYear(new Date().getFullYear() + 2);
  private currentDate = new Date();
  // Second step
  private apartmentClassChooseForm: FormGroup;
  private isApartmentClassFormComplete = false;
  // Third step
  private bookingServices: BookingAddService[];
  private currentServices: {id: number, countServices: number}[];
  // Finish step
  private dbBooking: Booking;
  private dbCurrentBookingServices: BookingAddServicesWithCount[];

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private http: HttpClient, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.datesForm = this.fb.group({
      startDate: [{value: this.sDate, disabled: true}, [Validators.required]],
      endDate: [{value: this.eDate, disabled: true}, [Validators.required]]
    });

    if(this.sDate != null && this.eDate != null)
      this.isDatesFromComplete = true;

    this.apartmentClassChooseForm = this.fb.group({
      apartmentClassId: [null, Validators.required]
    });
  }

  startDate() {
    return this.datesForm.get('startDate');
  }

  endDate() {
    return this.datesForm.get('endDate');
  }

  onDatesFormChange() {
    let tmp = true;
    for (let key in this.datesForm.controls) {
      tmp = tmp && this.datesForm.get(key).errors === null && this.datesForm.get(key).value !== null;
    }
    this.isDatesFromComplete = tmp;

    if ( this.startDate().value !== null) {
      this.minDate = this.startDate().value;
    }
    if ( this.endDate().value !== null) {
      this.maxDate = this.endDate().value;
    }
  }

  onDateFormSubmit() {
    if (!this.isDatesFromComplete) return;
    const sd = this.datePipe.transform(this.startDate().value, 'yyyy-MM-dd');
    const ed = this.datePipe.transform(this.endDate().value, 'yyyy-MM-dd');
    this.http.get(`http://localhost:8090/bookings/find?startDate=${sd}&endDate=${ed}`)
      .subscribe(
        (data: FreeApartments[]) => {
          this.freeapartmentClasses = data.filter(cl => {return cl.countOfApartments > 0});
          console.log('got free apartments');
        },
        error => {
          console.log('error with getting free apartments');
          console.log(error);
        }
      );
  }

  onChangeDatesClick() {
    this.freeapartmentClasses = null;
  }

  apartmentClassId() {
    return this.apartmentClassChooseForm.get('apartmentClassId');
  }

  onApartmentClassFormChange() {
    if (this.apartmentClassId().value !== null) {
      this.isApartmentClassFormComplete = true;
    }
  }

  onApartmentClassFormSubmit() {
    if (!this.isApartmentClassFormComplete) return;
    console.log(this.apartmentClassId().value);
    const booking = new BookingToSend();
    booking.apartmentClass = new ApartmentsClass();
    booking.apartmentClass.id = this.apartmentClassId().value;
    booking.bookingStatus = 'Created';
    booking.startDate = this.datePipe.transform(this.startDate().value, 'yyyy-MM-dd');
    booking.endDate = this.datePipe.transform(this.endDate().value, 'yyyy-MM-dd');
    booking.user = new User();
    booking.user.id = this.authService.currentUserObject.id;
    this.http.post('http://localhost:8090/bookings', booking)
      .subscribe(
        (data: Booking) => {
            this.currentBooking = data;
            console.log('booking created with id ' + data.id);
        },
        error => {
          console.log('booking creation error');
          console.log(error);
          console.log(booking);
        }
      );

    this.http.get('http://localhost:8090/bookingAddServices')
      .subscribe(
        (data: BookingAddService[]) => {
          console.log('got booking services');
          this.bookingServices = data;
          const arr = this.bookingServices
            .map(s => {
              return this.fb.control(false);
            });
        },
        error => {
          console.log('error getting booking services');
          console.log(error);
        }
      );

  }

  onChangeApartmentsClick() {
    this.deleteBooking();
    this.currentBooking = null;
  }

  deleteBooking() {
    this.http.delete('http://localhost:8090/bookings/' + this.currentBooking.id)
      .subscribe(
      data => {
        console.log('booking deleted');
      },
      error1 => {
        console.log('cant delete booking');
        console.log(error1);
      }
    );
  }

  onServicesFormSubmit() {
    let servicesCount = 0;
    this.currentServices = [];
    const values =  document.getElementsByName('service-checkbox')
      .forEach((val, i, par) => {
        const v = (val as HTMLInputElement);
        if (v.checked) {
          this.currentServices[servicesCount++] = {id: Number(v.value), countServices: 1};
        }
      });
    console.log(this.currentServices);

    this.http.post('http://localhost:8090/bookings/' + this.currentBooking.id + '/servicesList', this.currentServices)
      .subscribe(
        data => {
          console.log('booking services added');
          this.getBookingFromDB();
          this.getCurrentBookingServicesFromDB();
        },
        err => {
          console.log('cant add booking services');
          console.log(err);
        }
      );
  }

  getBookingFromDB() {
    this.http.get('http://localhost:8090/bookings/' + this.currentBooking.id)
      .subscribe(
        (data: Booking) => {
          console.log('got booking from db');
          this.dbBooking = data;
        },
        error1 => {
          console.log('cant get booking from db');
          console.log(error1);
        }
      );
  }
  getCurrentBookingServicesFromDB() {
    this.http.get('http://localhost:8090/bookings/' + this.currentBooking.id + '/services')
      .subscribe(
        (data: BookingAddServicesWithCount[]) => {
          console.log('got current booking services from db');
          console.log(data);
          this.dbCurrentBookingServices = data;
        },
        error1 => {
          console.log('cant get current booking services from db');
          console.log('Всему пипец');
          console.log(error1);
        }
      );
  }

  onChangeServicesClick() {
    this.http.delete('http://localhost:8090/bookings/' + this.currentBooking.id + '/services')
      .subscribe(
        data => {
          console.log('current booking services deleted');
          this.dbCurrentBookingServices = null;
          this.dbBooking = null;
          this.currentServices = null;
        },
        err => {
          console.log('cant delete current booking services');
          console.log(err);
        }
      );
  }

  onConfirmBookingClick() {
    this.http.patch('http://localhost:8090/bookings/' + this.currentBooking.id, {status: 'Confirmed'})
      .subscribe(
        data => {
          this.currentBooking.bookingStatus = 'Confirmed';
          console.log('Eeeeeeeeeeeeeeeeeeeeeee kaef');
        }
      );
  }
}

class FreeApartments {
  countOfApartments: number;
  apartmentClass: ApartmentsClass;
}

class BookingAddServicesWithCount {
  bookingAddServices: BookingAddService;
  count: number;
}

class BookingToSend {
  id: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  comment: string;
  createdDate: string;
  review: string;
  bookingStatus: string;
  user: User;
  apartmentClass: ApartmentsClass;
  apartments: Apartments;
}
