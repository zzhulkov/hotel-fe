import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';


const URL = 'http://localhost:8080';
/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'staff-table-component',
  styleUrls: ['staff-table.css'],
  templateUrl: 'staff-table.html',
})
export class StaffTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['id', 'user.firstname', 'user.lastname', 'user.email', 'user.phone', 'user.login', 'speciality', 'active'];
  staffList = new MatTableDataSource<Staff>();
  idFilter = new FormControl('');
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

  constructor(private http: HttpClient) {
    super();
    this.getAllStaff();
    this.staffList.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.idFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.firstNameFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        firstname => {
          this.filterValues.firstname = firstname;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lastNameFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        lastname => {
          this.filterValues.lastname = lastname;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.emailFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        email => {
          this.filterValues.email = email;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.phoneFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        phone => {
          this.filterValues.phone = phone;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.loginFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        login => {
          this.filterValues.login = login;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.specialityFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        speciality => {
          this.filterValues.speciality = speciality;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
    this.activeFilter.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        active => {
          this.filterValues.active = active;
          this.staffList.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  ngAfterViewInit(): void {
    this.staffList.paginator = this.paginator;
  }

  public getAllStaff = () => {
    this.http.get(URL + '/staff/').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.staffList.data = (res as Staff[]);
    });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.user.lastname.toLowerCase().indexOf(searchTerms.lastname) !== -1
        && data.user.email.toLowerCase().indexOf(searchTerms.email) !== -1
        && data.user.firstname.toLowerCase().indexOf(searchTerms.firstname) !== -1
        && data.user.phoneNumber.toLowerCase().indexOf(searchTerms.phone) !== -1
        && data.user.login.toLowerCase().indexOf(searchTerms.login) !== -1
        && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.speciality.toLowerCase().indexOf(searchTerms.speciality) !== -1
        && data.active.toString().toLowerCase().indexOf(searchTerms.active) !== -1;
    }
    return filterFunction;
  }
}