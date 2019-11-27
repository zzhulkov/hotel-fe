import {Component, OnInit} from '@angular/core';
import {ApartmentClass} from '../../../../user/booking/components/apartmentClass/apartmentClass';
import {takeUntil} from 'rxjs/operators';
import {Staff} from '../../../../../component/staff';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';


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
export class StaffTableComponent extends Unsubscribable implements OnInit {
  staffList: Staff[];
  selectedStaff: Staff;
  displayedColumns = ['id', 'user.firstname', 'user.lastname', 'user.email', 'user.phone', 'user.login', 'speciality', 'active'];
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
/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
*/
