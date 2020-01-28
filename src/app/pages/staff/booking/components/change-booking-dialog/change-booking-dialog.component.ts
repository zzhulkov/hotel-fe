import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from '../../../../../component/booking';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {Apartments} from "../../../../../component/apartments";
import {SelectService} from "../../../../../services/select.service";

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



  addForm: FormGroup;

  booking = {} as Booking;
  apartment = {} as Apartments;
  apartmentClass = {} as ApartmentsClass;

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dataTransfer: DataTransferService, public  selectService: SelectService) {
    super(selectService);
    this.getAllApartmentsClasses();
    this.booking = dataTransfer.getData();
    if (this.booking.apartmentsClass == null) {
      // this.selectedApartmentsClass = new ApartmentsClass;
    }
    this.selectedApartmentsClass = this.booking.apartmentsClass;
    console.log(this.booking);
  }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      startDate: [
        this.booking.startDate
      ],
      endDate: [
        this.booking.endDate
      ],
      totalPrice: [
        this.booking.totalPrice
      ],
      comment: [
        this.booking.comment
      ],
      createdDate: [
        this.booking.createdDate
      ],
      review: [
        this.booking.review
      ],
      bookingStatus: [
        this.booking.bookingStatus
      ],
      email: [
        this.booking.user.email
      ],
      nameClass: [
        ''
        // this.selectedApartmentsClass.nameClass
      ],
      roomNumber: [
        ''

        // this.booking.apartments.roomNumber
      ]
    });
    // this.checkValid();
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
    // this.booking.apartments.roomNumber = this.addForm.value.roomNumber;
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



