import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ShareService} from './share-service';


const URL = 'http://localhost:8080';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'staff-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'staff-table.html',
})
export class StaffTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['user.firstname', 'user.lastname', 'user.email', 'user.phone', 'user.login', 'speciality', 'active'];
  staffList = new MatTableDataSource<Staff>();
  firstNameFilter = new FormControl('');
  lastNameFilter = new FormControl('');
  emailFilter = new FormControl('');
  phoneFilter = new FormControl('');
  loginFilter = new FormControl('');
  specialityFilter = new FormControl('');
  activeFilter = new FormControl('');
  filterValues = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    login: '',
    speciality: '',
    active: ''
  };
  private ss: ShareService;

  constructor(private http: HttpClient, ss: ShareService) {
    super();
    this.getAllStaff();
    this.staffList.filterPredicate = this.createFilter();
    this.ss = ss;
  }

// вынести input
  ngOnInit() {
/*    this.ss.getEmittedValue()
      .subscribe(item => {
        this.filterValues.firstname = item;
        this.staffList.filter = JSON.stringify(this.filterValues);
      }
      );*/
    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.firstname = item.firstName;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.firstname);
        }
      );

    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.lastname = item.lastName;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.lastname);
        }
      );
    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.email = item.email;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.email);
        }
      );
    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.phone = item.phone;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.phone);
        }
      );
    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.login = item.login;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.login);
        }
      );

    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.speciality = item.speciality;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.speciality);
        }
      );

    this.ss.getEmittedValue()
      .subscribe(item => {
          this.filterValues.active = item.active;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.active);
        }
      );
  /*
    this.emailFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        email => {
          this.filterValues.email = email;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.phoneFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        phone => {
          this.filterValues.phone = phone;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.loginFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        login => {
          this.filterValues.login = login;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.specialityFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        speciality => {
          this.filterValues.speciality = speciality;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      );
    this.activeFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        active => {
          this.filterValues.active = active;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      );*/
  }

  ngAfterViewInit(): void {
    this.staffList.paginator = this.paginator;
  }

  public getAllStaff = () => {
    this.http.get(URL + '/staff').subscribe(res => {
      console.log(res);
      this.staffList.data = (res as Staff[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line:only-arrow-functions
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.user.lastname.toLowerCase().indexOf(searchTerms.lastname.toLocaleLowerCase()) !== -1
        && data.user.email.toLowerCase().indexOf(searchTerms.email.toLowerCase()) !== -1
        && data.user.firstname.toLowerCase().indexOf(searchTerms.firstname.toLowerCase()) !== -1
        && data.user.phoneNumber.toLowerCase().indexOf(searchTerms.phone.toLowerCase()) !== -1
        && data.user.login.toLowerCase().indexOf(searchTerms.login.toLowerCase()) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id.toLowerCase()) !== -1
        && data.speciality.toLowerCase().indexOf(searchTerms.speciality.toLowerCase()) !== -1
        && data.active.toString().toLowerCase().indexOf(searchTerms.active.toLowerCase()) !== -1;
    };
    return filterFunction;
  }
}
