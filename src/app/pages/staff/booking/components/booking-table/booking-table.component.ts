import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Booking} from '../../../../../component/booking';
import {ConstantsService} from '../../../../../services/constants.service';
import {FormControl} from '@angular/forms';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {SelectService} from "../../../../../services/select.service";


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

  private dataTransfer: DataTransferService;
  selectedRow: any;
  bookingList = new MatTableDataSource<Booking>();
  selectedBooking: Booking;
  displayedColumns = ['id', 'startDate', 'endDate', 'totalPrice', 'comments', 'createdDate', 'review', 'bookingStatus', 'email', 'nameClass', 'roomNumber'];
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
    id: '',
    startDate: '',
    endDate: '',
    totalPrice: '',
    comment: '',
    createdDate: '',
    review: '',
    bookingStatus: '',
    email: '',
    nameClass: '',
    roomNumber: '',
  };

  constructor(private http: HttpClient, dataTransfer: DataTransferService, public selectService: SelectService) {
    super(selectService);
    this.getAllBookings();
    this.dataTransfer = dataTransfer;
    this.bookingList.filterPredicate = this.createFilter();
  }

  haveApartments(booking: any): boolean {
    if (booking.apartment == null) {
      return false;
    } else {
      return true;
    }
  }

  selectRow(row: any): void {
    this.selectedRow = row.id;
    console.log(row);
    this.dataTransfer.setData(row);
    // this.selectService.announceSelect(row);
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
        email => {
          this.filterValues.email = email;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentClassFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        nameClass => {
          this.filterValues.nameClass = nameClass;
          this.bookingList.filter = JSON.stringify(this.filterValues);
        }
      );

    this.apartmentFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        roomNumber => {
          this.filterValues.roomNumber = roomNumber;
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
      let result = data.startDate.toString().toLowerCase().indexOf(searchTerms.startDate) !== -1
        && data.endDate.toString().toLowerCase().indexOf(searchTerms.endDate) !== -1
        && data.totalPrice.toString().toLowerCase().indexOf(searchTerms.totalPrice) !== -1
        && data.createdDate.toString().toLowerCase().indexOf(searchTerms.createdDate) !== -1
        && data.bookingStatus.toString().toLowerCase().indexOf(searchTerms.bookingStatus) !== -1
        && data.user.firstname.indexOf(searchTerms.firstname) !== -1
        && data.apartmentClass.nameClass.indexOf(searchTerms.nameClass) !== -1;

      if (data.apartment !== null) {
        result = result && data.apartment.roomNumber.toString().toLowerCase().indexOf(searchTerms.roomNumber) !== -1;
      }
      return result;
    };
    return filterFunction;
  }

}
