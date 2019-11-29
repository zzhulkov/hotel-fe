import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {HttpClient} from '@angular/common/http';
import {Apartments} from '../../../../../component/apartments';

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
export class ApartmentsTableComponent extends Unsubscribable implements OnInit {
  apartmentsList: Apartments[];
  selectedApartments: Apartments;
  displayedColumns = ['id', 'roomNumber', 'photoUrl', 'description', 'status', 'apartmentsClass.id',
    'apartmentsClass.nameClass', 'apartmentsClass.numberOfRooms', 'apartmentsClass.numberOfCouchette'];

  dataSource = this.apartmentsList;

  constructor(private http: HttpClient) {
    super();
  }

  onSelect(apartments: Apartments): void {
    this.selectedApartments = apartments;
  }

  ngOnInit() {
    this.http.get(URL + '/staff/').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.apartmentsList = (res as Apartments[]);
    });
  }
}
