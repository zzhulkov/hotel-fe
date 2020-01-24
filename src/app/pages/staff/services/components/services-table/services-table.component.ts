import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Service} from '../../../../../component/service';

const URL = new ConstantsService().BASE_URL;

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'services-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'services-table.html',
})
export class ServicesTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private dataTransfer: DataTransferService;
  selectedRow: any;
  servicesList = new MatTableDataSource<Service>();
  displayedColumns = ['id', 'serviceName', 'price'];

  serviceNameFilter = new FormControl('');
  priceFilter = new FormControl('');

  filterValues = {
    id: '',
    serviceName: '',
    price: ''
  };


  constructor(private http: HttpClient, dataTransfer: DataTransferService) {
    super();
    this.getAllApartmentsClasses();
    this.dataTransfer = dataTransfer;
    this.servicesList.filterPredicate = this.createFilter();
  }

  selectRow(row: any): void {
    this.selectedRow = row.id;
    console.log(row);
    this.dataTransfer.setData(row);
  }

  ngOnInit() {
    this.serviceNameFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        serviceName => {
          this.filterValues.serviceName = serviceName;
          this.servicesList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.priceFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        price => {
          this.filterValues.price = price;
          this.servicesList.filter = JSON.stringify(this.filterValues);
        }
      );

  }

  ngAfterViewInit(): void {
    this.servicesList.paginator = this.paginator;
  }

  public getAllApartmentsClasses = () => {
    this.http.get(URL + 'bookingAddServices/').subscribe(res => {
      console.log(res);
      this.servicesList.data = (res as Service[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.serviceName.toLowerCase().indexOf(searchTerms.serviceName) !== -1
        && data.price.toString().toLowerCase().indexOf(searchTerms.price) !== -1;
    };
    return filterFunction;
  }
}
