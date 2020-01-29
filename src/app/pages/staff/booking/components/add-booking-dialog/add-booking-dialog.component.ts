import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from "../../../../../component/booking";
import {Subscription} from "rxjs";
import {Apartments} from "../../../../../component/apartments";
import {User} from "../../../../../component/user";
import {BookingStatus} from "../../../../../component/booking-status.type";
import {SelectService} from "../../../../../services/select.service";
import {Unsubscribable} from "../../../../../component/Unsubscribable";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-booking-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-booking-dialog.html',
})
export class AddBookingDialogComponent extends Unsubscribable implements OnInit {

  addForm: FormGroup;

  booking = {} as Booking;
  subscription: Subscription;


  apartmentsClassesList: ApartmentsClass[];
  apartmentsList: Apartments[];
  selectedApartmentsClass: ApartmentsClass;
  selectedApartment: Apartments;
  user: User;

  status = [
    'Created',
    'CheckedIn',
    'Closed',
    'Canceled'
  ];
  private selectedStatus: BookingStatus;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient, public selectService: SelectService) {
    super(selectService);
    this.getAllApartmentsClasses();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      totalPrice: [''],
      comment: [''],
      review: [''],
      bookingStatus: [''],
      email: [''],
      nameClass: ['', Validators.required],
      roomNumber: ['']
    });

    this.checkValid();
  }

  fillForm(row: Booking) {
    this.addForm.setValue({
      startDate: row.startDate,
      endDate: row.endDate,
      totalPrice: row.totalPrice,
      comment: row.comment,
      review: row.review,
      bookingStatus: row.bookingStatus,
      email: row.user.email,
      nameClass: row.apartmentClass.nameClass,
      roomNumber: row.apartment.roomNumber
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
      this.getUserByEmail();
    }
  }

  setBooking() {
    this.booking.apartmentClass = this.selectedApartmentsClass;
    this.booking.apartment = this.selectedApartment;
    this.booking.startDate = this.addForm.value.startDate;
    this.booking.endDate = this.addForm.value.endDate;
    //this.booking.totalPrice = this.addForm.value.totalPrice;
    this.booking.comment = this.addForm.value.comment;
    this.booking.review = this.addForm.value.review;
    this.booking.bookingStatus = this.selectedStatus;
    this.booking.user = this.user;
    console.log(this.booking);
    this.createBooking();

  }

  onSelectAprtmntClass(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
    this.getFreeApartments(this.addForm.value.startDate, this.addForm.value.endDate, apartmentsClass.id);
    this.addForm.setValue({
      roomNumber: ''
    });
  }

  onSelectAprtmnt(apartments: Apartments): void {
    this.selectedApartment = apartments;
  }

  onSelectStatus(status: any): void {
    this.selectedStatus = status;
  }

  getUserByEmail() {
    let uList: User[];
    this.http.get(URL + 'users' + '?email=' + this.addForm.value.email).subscribe(
      res => {
        console.log(res);
        uList = (res as User[]);
        this.user = uList[0];
        console.log(this.user);
        this.setBooking();
      });
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }

  getFreeApartments(startDate: Date, endDate: Date, classId: number) {
    this.http.get(URL + 'bookings' + '/findList?' + 'startDate=' + startDate +
      // 2020-04-19
      '&endDate=' + endDate +
      // 2020-04-23
      '&apartmentClass=' + classId).subscribe(res => {
      console.log(res);
      this.apartmentsList = (res as Apartments[]);
    });
  }

  createBooking() {
    this.http.post(URL + 'bookings/', this.booking).subscribe(
      res => {
        console.log(res);
        this.booking = (res as Booking);
      });
  }
}



