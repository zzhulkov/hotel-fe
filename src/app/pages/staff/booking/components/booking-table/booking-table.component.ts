import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Booking} from '../../../../../component/booking';
import {ConstantsService} from '../../../../../services/constants.service';
import {FormControl} from '@angular/forms';


const URL = new ConstantsService().BASE_URL;

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'booking-table.html',
})
export class BookingTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  bookingList = new MatTableDataSource<Booking>();
  selectedBooking: Booking;
  displayedColumns = ['startDate', 'endDate', 'totalPrice', 'comments', 'createdDate', 'review', 'bookingStatus', 'bookedBy', 'apartmentClass', 'apartment'];
  dataSource = this.bookingList;
  startDateFilter = new FormControl('');
  endDateFilter = new FormControl('');
  totalPriceFilter = new FormControl('');
  commentsFilter = new FormControl('');
  createdDateFilter = new FormControl('');
  reviewFilter = new FormControl('');
  bookingStatusFilter = new FormControl('');
  bookedByFilter = new FormControl('');
  apartmentClassFilter = new FormControl('');
  apartmentFilter = new FormControl('');

  filterValues = {
    startDate: '',
    endDate: '',
    totalPrice: '',
    comment: '',
    createdDate: '',
    review: '',
    bookingStatus: '',
    userName: '',
    apartmentsClassName: '',
    apartmentsRoomNumber: '',
  };

  constructor(private http: HttpClient) {
    super();
    this.getAllBookings();
    this.bookingList.filterPredicate = this.createFilter();
  }

  onSelect(booking: Booking): void {
    this.selectedBooking = booking;
  }

  ngOnInit() {
    this.startDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        startDate => {
          this.filterValues.startDate = startDate;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.endDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        endDate => {
          this.filterValues.endDate = endDate;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.totalPriceFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        totalPrice => {
          this.filterValues.totalPrice = totalPrice;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.commentsFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        comment => {
          this.filterValues.comment = comment;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.createdDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        createdDate => {
          this.filterValues.createdDate = createdDate;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.reviewFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        review => {
          this.filterValues.review = review;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.bookingStatusFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        bookingStatus => {
          this.filterValues.bookingStatus = bookingStatus;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.bookedByFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        userName => {
          this.filterValues.userName = userName;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentClassFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        apartmentsClassName => {
          this.filterValues.apartmentsClassName = apartmentsClassName;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        apartmentsRoomNumber => {
          this.filterValues.apartmentsRoomNumber = apartmentsRoomNumber;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllBookings = () => {
    this.http.get(URL + 'bookings/').subscribe(res => {
      console.log(res);
      this.dataSource.data = (res as Booking[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.startDate.toString().toLowerCase().indexOf(searchTerms.startDate) !== -1
        && data.endDate.toString().toLowerCase().indexOf(searchTerms.endDate) !== -1
        && data.totalPrice.toString().toLowerCase().indexOf(searchTerms.totalPrice) !== -1
        && data.comment.toLowerCase().indexOf(searchTerms.comment) !== -1
        && data.createdDate.toString().toLowerCase().indexOf(searchTerms.createdDate) !== -1
        && data.review.toLowerCase().indexOf(searchTerms.review) !== -1
        && data.bookingStatus.toString().toLowerCase().indexOf(searchTerms.bookingStatus) !== -1
        && data.user.firstname.toLowerCase().indexOf(searchTerms.userName) !== -1
        && data.apartmentClass.nameClass.toLowerCase().indexOf(searchTerms.apartmentsClassName) !== -1
        && data.apartment.roomNumber.toString().toLowerCase().indexOf(searchTerms.apartmentsRoomNumber) !== -1;
    };
    return filterFunction;
  }

}
