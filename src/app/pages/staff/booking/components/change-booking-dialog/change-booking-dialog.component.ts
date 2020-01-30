import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {Booking} from '../../../../../component/booking';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {SelectService} from '../../../../../services/select.service';
import {Subscription} from 'rxjs';
import {User} from '../../../../../component/user';
import {Apartments} from '../../../../../component/apartments';
import {BookingStatus} from '../../../../../component/booking-status.type';
import {MatDialog} from '@angular/material';
import {DeleteBookingDialogComponent} from '../delete-booking-dialog/delete-booking-dialog.component';
import {DatePipe} from "@angular/common";

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
  isChangedStartPicker = false;
  isChangedEndPicker = false;
  changeForm: FormGroup;

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
  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private dataTransfer: DataTransferService,
              public selectService: SelectService,
              private datePipe: DatePipe) {
    super(selectService);
    this.getAllApartmentsClasses();
    this.booking = dataTransfer.getData();
    this.getFreeApartments(this.booking.startDate.toString(), this.booking.endDate.toString(), this.booking.apartmentClass.id.toString());
    console.log(this.booking);
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      startDate: [this.booking.startDate],
      endDate: [this.booking.endDate],
      // totalPrice: [this.booking.totalPrice],
      comment: [this.booking.comment],
      review: [this.booking.review],
      bookingStatus: [this.booking.bookingStatus],
      email: [this.booking.user.email],
      nameClass: [this.booking.apartmentClass.nameClass],
      roomNumber: [this.getRoomNumber(this.booking.apartment)]
    });

    this.getUserByEmail();

    // if (this.booking.apartment !== null) {
    //   this.addForm.value.roomNumber = this.booking.apartment.roomNumber;
    // }
    this.checkValid();

    this.subscription = this.selectService.selectAnnounced$
      .subscribe(row => {
        console.log(row);
        this.selectedStatus = this.booking.bookingStatus;
        this.selectedApartmentsClass = this.booking.apartmentClass;
        if (this.booking.apartment !== null) {
          this.selectedApartment = this.booking.apartment;
        }
        this.fillForm(row);
      });
  }

  getRoomNumber(apartment: Apartments): string {
    let roomNumber = '';
    if (apartment !== null) {
      roomNumber = apartment.roomNumber.toString();
    }
    return roomNumber;
  }

  fillForm(row: Booking) {
    this.changeForm.setValue({
      startDate: row.startDate,
      endDate: row.endDate,
      // totalPrice: row.totalPrice,
      comment: row.comment,
      review: row.review,
      bookingStatus: row.bookingStatus,
      email: row.user.email,
      nameClass: row.apartmentClass.nameClass,
      roomNumber: this.getRoomNumber(row.apartment)
    });
  }

  checkValid() {
    this.changeForm.markAllAsTouched();
    console.log('FormGroup: ', this.changeForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.changeForm.valid;
  }

  onClickStartPicker(): void {
    const startDateClean = this.datePipe.transform(this.changeForm.value.startDate, 'yyyy-MM-dd');
    console.log(startDateClean.toString());
    this.changeForm.setValue({
      startDate: startDateClean,
      endDate: this.changeForm.value.endDate,
      comment: this.changeForm.value.comment,
      review: this.changeForm.value.review,
      bookingStatus: this.changeForm.value.bookingStatus,
      email: this.changeForm.value.email,
      nameClass: this.changeForm.value.nameClass,
      roomNumber: this.changeForm.value.roomNumber
    });
    console.log(this.changeForm.value.startDate);
    this.isChangedStartPicker = true;
  }

  onClickEndPicker(): void {
    const endDateClean = this.datePipe.transform(this.changeForm.value.endDate, 'yyyy-MM-dd');
    console.log(this.changeForm.value.endDate.getDate());
    this.changeForm.setValue({
      startDate: this.changeForm.value.startDate,
      endDate: endDateClean,
      comment: this.changeForm.value.comment,
      review: this.changeForm.value.review,
      bookingStatus: this.changeForm.value.bookingStatus,
      email: this.changeForm.value.email,
      nameClass: this.changeForm.value.nameClass,
      roomNumber: this.changeForm.value.roomNumber
    });
    this.isChangedEndPicker = true;
  }

  onSubmit() {
    if (this.changeForm.valid) {
      this.getUserByEmail();
      this.setBooking();
      this.createBooking();
    }
  }

  createBooking() {
    this.http.put(URL + 'bookings/' + this.booking.id, this.booking).subscribe(
      res => {
        console.log(res);
        this.booking = (res as Booking);
      });
  }

  setBooking() {
    this.booking.apartmentClass = this.selectedApartmentsClass;
    this.booking.apartment = this.selectedApartment;
    this.booking.startDate = this.changeForm.value.startDate;
    this.booking.endDate = this.changeForm.value.endDate;
    // this.booking.totalPrice = this.addForm.value.totalPrice;
    this.booking.comment = this.changeForm.value.comment;
    this.booking.review = this.changeForm.value.review;
    this.booking.bookingStatus = this.selectedStatus;
    this.booking.user = this.user;
    console.log(this.booking);
  }

  onSelectAprtmntClass(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
    this.getFreeApartments(this.changeForm.value.startDate.toString(), this.changeForm.value.endDate.toString(), apartmentsClass.id.toString());
    console.log(this.changeForm.value.startDate.toString());
  }

  onSelectAprtmnt(apartments: Apartments): void {
    this.selectedApartment = apartments;
  }

  onSelectStatus(status: any): void {
    this.selectedStatus = status;
  }

  getUserByEmail() {
    let uList: User[];
    this.http.get(URL + 'users' + '?email=' + this.changeForm.value.email).subscribe(
      res => {
        console.log(res);
        uList = (res as User[]);
        this.user = uList[0];
        console.log(this.user);
      });
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }

  getFreeApartments(startDate: string, endDate: string, classId: string) {
    this.http.get(URL + 'bookings' + '/findList?'
      + 'startDate=' + startDate
      + '&endDate=' + endDate
      + '&apartmentClass=' + classId)
      .subscribe(res => {
        console.log(res);
        this.apartmentsList = (res as Apartments[]);
      });
  }

  deleteBooking() {
    const dialogRef = this.dialog.open(DeleteBookingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



