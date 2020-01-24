import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {FormControl} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

const URL = new ConstantsService().BASE_URL;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'staff-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'staff-table.html',
})
export class StaffTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @Output() selectedRowClicked: EventEmitter<any> = new EventEmitter();
  @Output() reselectRow: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private dataTransfer: DataTransferService;
  selectedRow: any;

  displayedColumns = ['id', 'firstname', 'lastname', 'email', 'speciality', 'active'];
  staffList = new MatTableDataSource<Staff>();

  firstNameFilter = new FormControl('');
  lastNameFilter = new FormControl('');
  emailFilter = new FormControl('');
  specialityFilter = new FormControl('');
  activeFilter = new FormControl('');

  filterValues = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    speciality: '',
    active: ''
  };

  constructor(private http: HttpClient, dataTransfer: DataTransferService) {
    super();
    this.getAllStaff();
    this.dataTransfer = dataTransfer;
    this.staffList.filterPredicate = this.createFilter();
  }

  selectRow(row: any): void {
    this.reselectRow.emit();
    this.selectedRow = row.id;
    console.log(row);
    this.dataTransfer.setData(row);
    this.isSelected();
  }

  isSelected() {
    this.selectedRowClicked.emit();
  }

  ngOnInit() {
    this.firstNameFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(firstname => {
        this.filterValues.firstname = firstname;
          this.staffList.filter = JSON.stringify(this.filterValues);
        console.log(this.filterValues.firstname);
        }
      );

    this.lastNameFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(lastname => {
        this.filterValues.lastname = lastname;
          this.staffList.filter = JSON.stringify(this.filterValues);
        console.log(this.filterValues.lastname);
        }
      );
    this.emailFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(email => {
        this.filterValues.email = email;
          this.staffList.filter = JSON.stringify(this.filterValues);
        console.log(this.filterValues.email);
        }
      );

    this.specialityFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(speciality => {
        this.filterValues.speciality = speciality;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.speciality);
        }
      );

    this.activeFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(active => {
        this.filterValues.active = active;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.active);
        }
      );
  }

  ngAfterViewInit(): void {
    this.staffList.paginator = this.paginator;
  }

  public getAllStaff = () => {
    this.http.get(URL + 'staff').subscribe(res => {
      console.log(res);
      this.staffList.data = (res as Staff[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.user.lastname.indexOf(searchTerms.lastname) !== -1
        && data.user.email.indexOf(searchTerms.email) !== -1
        && data.user.firstname.indexOf(searchTerms.firstname) !== -1
        && data.speciality.indexOf(searchTerms.speciality) !== -1
        && data.active.toString().toLowerCase().indexOf(searchTerms.active) !== -1;
    };
    return filterFunction;
  }
}
