import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ShareService} from '../../../../../services/share.service';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';

const URL = new ConstantsService().BASE_URL;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'staff-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'staff-table.html',
})
export class StaffTableComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private dataTransfer: DataTransferService;
  selectedRow: any;
  
  displayedColumns = ['user.firstname', 'user.lastname', 'user.email', 'user.phone', 'user.login', 'speciality', 'active'];
  staffList = new MatTableDataSource<Staff>();
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
  private shareService: ShareService;

  constructor(private http: HttpClient, shareService: ShareService, dataTransfer: DataTransferService) {
    super();
    this.getAllStaff();
    this.staffList.filterPredicate = this.createFilter();
    this.shareService = shareService;
    this.dataTransfer = dataTransfer;
  }

  selectRow(row: any): void {
    this.selectedRow = row.active;
    console.log(row);
    this.dataTransfer.setData(row);
  }

  ngOnInit() {
    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.firstname = item.firstname;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.firstname);
        }
      );

    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.lastname = item.lastname;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.lastname);
        }
      );
    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.email = item.email;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.email);
        }
      );
    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.phone = item.phone;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.phone);
        }
      );
    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.login = item.login;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.login);
        }
      );

    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.speciality = item.speciality;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.speciality);
        }
      );

    this.shareService.getEmittedValue()
      .subscribe(item => {
          this.filterValues.active = item.active;
          this.staffList.filter = JSON.stringify(this.filterValues);
          console.log(this.filterValues.active);
        }
      );
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
      return data.user.lastname.toLowerCase().indexOf(searchTerms.lastname.toLowerCase()) !== -1
        && data.user.email.toLowerCase().indexOf(searchTerms.email.toLowerCase()) !== -1
        && data.user.firstname.toLowerCase().indexOf(searchTerms.firstname.toLowerCase()) !== -1
        && data.user.phoneNumber.toLowerCase().indexOf(searchTerms.phone.toLowerCase()) !== -1
        && data.user.login.toLowerCase().indexOf(searchTerms.login.toLowerCase()) !== -1
        && data.speciality.toLowerCase().indexOf(searchTerms.speciality.toLowerCase()) !== -1
        && data.active.toString().toLowerCase().indexOf(searchTerms.active.toLowerCase()) !== -1;
    };
    return filterFunction;
  }
}
