import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from '../../../../../component/booking';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {Apartments} from "../../../../../component/apartments";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-booking-dialog.html',
})
export class ChangeBookingDialogComponent extends Unsubscribable implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dataTransfer: DataTransferService) {
    super();
    this.getAllApartmentsClasses();
    this.booking = dataTransfer.getData();
    console.log(this.booking);
  }

  addForm: FormGroup;

  booking = {} as Booking;
  apartment = {} as Apartments;
  apartmentClass = {} as ApartmentsClass;

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      startDate: [this.booking.startDate, Validators.required],
      endDate: [this.booking.endDate, Validators.required],
      totalPrice: [this.booking.totalPrice, Validators.required],
      comment: [this.booking.comment],
      createdDate: [this.booking.createdDate, Validators.required],
      review: [this.booking.review],
      bookingStatus: [this.booking.bookingStatus],
      email: [this.booking.user.email],
      nameClass: [this.booking.apartmentsClass.nameClass],
      roomNumber: [this.booking.apartments.roomNumber]
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
    this.booking.user.email = this.addForm.value.email;
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



