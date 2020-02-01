import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ApartmentPrice} from '../../../../../component/apartment-price';
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
  selector: 'apartment-prices-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'apartment-prices-table.html',
})
export class ApartmentPricesTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private dataTransfer: DataTransferService;
  selectedRow: any;
  apartmentPricesList = new MatTableDataSource<ApartmentPrice>();
  selectedApartmentPrice: ApartmentPrice;
  displayedColumns = ['id', 'nameClass', 'price', 'startDate', 'endDate'];
  dataSource = this.apartmentPricesList;
  totalPriceFilter = new FormControl('');
  startDateFilter = new FormControl('');
  endDateFilter = new FormControl('');
  apartmentClassFilter = new FormControl('');

  filterValues = {
    id: '',
    totalPrice: '',
    startDate: '',
    endDate: '',
    nameClass: ''
  };

  constructor(private http: HttpClient, dataTransfer: DataTransferService, public selectService: SelectService) {
    super(selectService);
    this.getAllApartmentPrices();
    this.dataTransfer = dataTransfer;
    this.apartmentPricesList.filterPredicate = this.createFilter();
  }

  /*TODO delete haveApartments*/
  haveApartments(apartmentPrice: any): boolean {
    if (apartmentPrice.apartment == null) {
      return false;
    } else {
      return true;
    }
  }

  selectRow(row: any): void {
    this.selectedRow = row.id;
    console.log(row);
    this.dataTransfer.setData(row);
    this.selectService.announceSelect(row);
  }

  onSelect(apartmentPrice: ApartmentPrice): void {
    this.selectedApartmentPrice = apartmentPrice;
  }

  ngOnInit() {
    this.totalPriceFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        totalPrice => {
          this.filterValues.totalPrice = totalPrice;
          this.apartmentPricesList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.startDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        startDate => {
          this.filterValues.startDate = startDate;
          this.apartmentPricesList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.endDateFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        endDate => {
          this.filterValues.endDate = endDate;
          this.apartmentPricesList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.apartmentClassFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        nameClass => {
          this.filterValues.nameClass = nameClass;
          this.apartmentPricesList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public getAllApartmentPrices = () => {
    this.http.get(URL + 'apartmentPrices/').subscribe(res => {
      console.log(res);
      this.dataSource.data = (res as ApartmentPrice[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    const filterFunction = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      let result = data.startDate.toString().toLowerCase().indexOf(searchTerms.startDate) !== -1
        && data.endDate.toString().toLowerCase().indexOf(searchTerms.endDate) !== -1
        && data.totalPrice.toString().toLowerCase().indexOf(searchTerms.totalPrice) !== -1
        && data.apartmentClass.nameClass.indexOf(searchTerms.nameClass) !== -1;
      return result;
    };
    return filterFunction;
  }

}
