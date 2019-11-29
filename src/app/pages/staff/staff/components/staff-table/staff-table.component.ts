import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';


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

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit() {
    this.getAllStaff();
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
  public doFilter(value: string)  {
    this.staffList.filter = value.trim().toLocaleLowerCase();
  }
}
