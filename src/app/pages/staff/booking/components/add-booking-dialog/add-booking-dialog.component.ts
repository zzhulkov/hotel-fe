import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from "../../../../../component/booking";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-booking-dialog.html',
})
export class AddBookingDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.getAllApartmentsClasses();
  }

  addForm: FormGroup;

  booking = {} as Booking;
  apartmentClass = {} as ApartmentsClass;

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalPrice: ['', Validators.required],
      comment: [''],
      createdDate: ['', Validators.required],
      review: [''],
      bookingStatus: [''],
      firstname: [''],
      nameClass: [''],
      roomNumber: ['']
    });
  }

  checkValid() {
    this.addForm.markAllAsTouched();
    console.log('FormGroup: ', this.addForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addForm.valid;
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.setBooking();
      this.createBooking();
    }
  }

  createBooking() {
    this.http.post(URL + 'bookings/', this.booking).subscribe(
      res => {
        console.log(res);
        this.booking = (res as Booking);
      });
  }

  setBooking() {
    this.booking.apartmentsClass = this.selectedApartmentsClass;
    this.booking.apartments.roomNumber = this.addForm.value.roomNumber;
    this.booking.startDate = this.addForm.value.startDate;
    this.booking.endDate = this.addForm.value.endDate;
    this.booking.totalPrice = this.addForm.value.totalPrice;
    this.booking.comment = this.addForm.value.comment;
    this.booking.createdDate = this.addForm.value.createdDate;
    this.booking.review = this.addForm.value.review;
    this.booking.bookingStatus = this.addForm.value.bookingStatus;
    this.booking.user.firstname = this.addForm.value.firstname;
    console.log(this.booking);
  }

  onSelect(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }
}



