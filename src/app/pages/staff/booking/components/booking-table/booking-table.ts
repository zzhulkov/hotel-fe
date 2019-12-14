import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Booking} from '../../../../../component/booking';



const URL = 'http://localhost:8090';
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

  displayedColumns = ['startDate', 'endDate', 'totalPrice', 'comments', 'createdDate', 'review', 'bookingStatus', 'bookedBy', 'apartmentClass', 'apartment'];
  dataSource = new MatTableDataSource<Booking>();
  /*  idFilter = new FormControl('');
    startDateFilter = new FormControl('');
    endDateFilter = new FormControl('');
    totalPriceFilter = new FormControl('');
    commentsFilter = new FormControl('');
    createdDateFilter = new FormControl('');
    reviewFilter = new FormControl('');
    bookingStatusFilter = new FormControl('');
    bookedByFilter = new FormControl('');
    apartmentClassFilter = new FormControl('');
    apartmentFilter = new FormControl(''); */

  constructor(private http: HttpClient) {
    super();
    this.getAllBookings();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllBookings = () => {
    this.http.get(URL + '/bookings').subscribe(res => {
      console.log(res);
      this.dataSource.data = (res as Booking[]);
    });
  }

}
