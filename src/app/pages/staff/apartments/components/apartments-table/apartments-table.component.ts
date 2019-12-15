import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {Apartments} from '../../../../../component/apartments';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';

const URL = 'http://localhost:8090';

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'apartments-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'apartments-table.html',
})
export class ApartmentsTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  apartmentsList = new MatTableDataSource<Apartments>();
  selectedApartments: Apartments;
  displayedColumns = ['roomNumber', 'photo', 'description', 'status', 'apartmentClass.id',
    'apartmentClass.nameClass', 'apartmentClass.numberOfRooms', 'apartmentClass.numberOfCouchette'];

  dataSource = this.apartmentsList;
  roomNumberFilter = new FormControl('');
  photoFilter = new FormControl('');
  descriptionFilter = new FormControl('');
  statusFilter = new FormControl('');
  classIdFilter = new FormControl('');
  nameClassFilter = new FormControl('');
  numberOfRoomsFilter = new FormControl('');
  numberOfCouchetteFilter = new FormControl('');

  filterValues = {
    roomNumber: '',
    photo: '',
    description: '',
    status: '',
    classId: '',
    nameClass: '',
    numberOfRooms: '',
    numberOfCouchette: ''
  };


  constructor(private http: HttpClient) {
    super();
    this.getAllApartments();
    this.apartmentsList.filterPredicate = this.createFilter();
  }

  onSelect(apartments: Apartments): void {
    this.selectedApartments = apartments;
  }

  // TODO form control, закрывать форму после успешного подтверждеия транзакции, отправлять запросы, пофиксить верстку, прикрутить bootstrap css
  ngOnInit() {

    this.roomNumberFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        roomNumber => {
          this.filterValues.roomNumber = roomNumber;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.photoFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        photo => {
          this.filterValues.photo = photo;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.descriptionFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        description => {
          this.filterValues.description = description;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.statusFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.classIdFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        classId => {
          this.filterValues.classId = classId;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.nameClassFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        nameClass => {
          this.filterValues.nameClass = nameClass;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.numberOfRoomsFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        numberOfRooms => {
          this.filterValues.numberOfRooms = numberOfRooms;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.numberOfCouchetteFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        numberOfCouchette => {
          this.filterValues.numberOfCouchette = numberOfCouchette;
          this.apartmentsList.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  ngAfterViewInit(): void {
    this.apartmentsList.paginator = this.paginator;
  }

  public getAllApartments = () => {
    this.http.get(URL + '/apartments').subscribe(res => {
      console.log(res);
      this.apartmentsList.data = (res as Apartments[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.roomNumber.toString().toLowerCase().indexOf(searchTerms.roomNumber) !== -1
        && data.photo.toLowerCase().indexOf(searchTerms.photo) !== -1
        && data.description.toLowerCase().indexOf(searchTerms.description) !== -1
        && data.status.toLowerCase().indexOf(searchTerms.status) !== -1
        && data.apartmentClass.numberOfCouchette.toString().toLowerCase().indexOf(searchTerms.numberOfCouchette) !== -1
        && data.apartmentClass.numberOfRooms.toString().toLowerCase().indexOf(searchTerms.numberOfRooms) !== -1
        && data.apartmentClass.nameClass.toLowerCase().indexOf(searchTerms.nameClass) !== -1
        && data.apartmentClass.id.toString().toLowerCase().indexOf(searchTerms.classId) !== -1;
    };
    return filterFunction;
  }
}
