import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {BookingAddServiceShip} from '../../../../../component/booking-add-service-ship';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {SelectService} from '../../../../../services/select.service';


const URL = new ConstantsService().BASE_URL;

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-add-service-dialog-component',
  styleUrls: ['../../../styles/table.css', '../../../styles/first-row-padding-fix.css'],
  templateUrl: 'booking-add-service-dialog.html',
})
export class BookingAddServiceDialogComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private dataTransfer: DataTransferService;
  bookingAddServiceShipList = new MatTableDataSource<BookingAddServiceShip>();
  displayedColumns = [
    'id',
    'serviceName',
    'price',
    'countServices'
  ];
  dataSource = this.bookingAddServiceShipList;


  constructor(private http: HttpClient, dataTransfer: DataTransferService, public selectService: SelectService) {
    super(selectService);
    this.getServiceShips();
    this.dataTransfer = dataTransfer;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getServiceShips = () => {
    this.selectService.selectAnnounced$
      .pipe(take(1))
      .subscribe(id => {
        this.http.get(URL + 'bookingAddServicesShip?booking=' + id.id).subscribe(res => {
          console.log('booking add services list' + res)
          this.dataSource.data = (res as BookingAddServiceShip[]);
        });
      });
  }

}
