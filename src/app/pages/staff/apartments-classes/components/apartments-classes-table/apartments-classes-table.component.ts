import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ConstantsService} from '../../../../../services/constants.service';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {DataTransferService} from "../../../../../services/data-transfer.service";
import {SelectService} from "../../../../../services/select.service";

const URL = new ConstantsService().BASE_URL;

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'apartments-classes-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'apartments-classes-table.html',
})
export class ApartmentsClassesTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @Output() selectedRowClicked: EventEmitter<any> = new EventEmitter();
  @Output() reselectRow: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private dataTransfer: DataTransferService;
  selectedRow: any;
  apartmentsClassesList = new MatTableDataSource<ApartmentsClass>();
  displayedColumns = ['nameClass', 'numberOfRooms', 'numberOfCouchette'];

  nameClassFilter = new FormControl('');
  numberOfRoomsFilter = new FormControl('');
  numberOfCouchetteFilter = new FormControl('');

  filterValues = {
    nameClass: '',
    numberOfRooms: '',
    numberOfCouchette: ''
  };


  constructor(private http: HttpClient, dataTransfer: DataTransferService, private missionService: SelectService) {
    super();
    this.getAllApartmentsClasses();
    this.dataTransfer = dataTransfer;
    this.apartmentsClassesList.filterPredicate = this.createFilter();
  }

  selectRow(row: any): void {
    this.selectedRow = row.nameClass;
    console.log(row);
    this.dataTransfer.setData(row);
    this.missionService.announceMission(row.id);
    this.isSelected();
  }

  isSelected() {
    this.selectedRowClicked.emit();
  }


  ngOnInit() {
    this.nameClassFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        nameClass => {
          this.filterValues.nameClass = nameClass;
          this.apartmentsClassesList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.numberOfRoomsFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        numberOfRooms => {
          this.filterValues.numberOfRooms = numberOfRooms;
          this.apartmentsClassesList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.numberOfCouchetteFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        numberOfCouchette => {
          this.filterValues.numberOfCouchette = numberOfCouchette;
          this.apartmentsClassesList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.apartmentsClassesList.paginator = this.paginator;
  }

  public getAllApartmentsClasses = () => {
    this.http.get(URL + 'apartmentsClasses/').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList.data = (res as ApartmentsClass[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.apartmentsClass.numberOfCouchette.toString().toLowerCase().indexOf(searchTerms.numberOfCouchette) !== -1
        && data.apartmentsClass.numberOfRooms.toString().toLowerCase().indexOf(searchTerms.numberOfRooms) !== -1
        && data.apartmentsClass.nameClass.toLowerCase().indexOf(searchTerms.nameClass) !== -1;
    };
    return filterFunction;
  }
}
