import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';


const URL = 'http://localhost:8090';
/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'staff-table-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'staff-table.html',
})
export class StaffTableComponent extends Unsubscribable implements OnInit {
  staffList: Staff[];
  selectedStaff: Staff;
  displayedColumns = ['id', 'user.firstname', 'user.lastname', 'user.email',
                        'user.phone', 'user.login', 'speciality', 'active'];
  dataSource = this.staffList;

  constructor(private http: HttpClient) {
    super();
  }

  onSelect(staff: Staff): void {
    this.selectedStaff = staff;
  }

  ngOnInit() {
    this.http.get(URL + '/staff/').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.staffList = (res as Staff[]);
    });
  }
}
