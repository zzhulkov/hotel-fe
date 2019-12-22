import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../../../../http.service';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {takeUntil} from 'rxjs/operators';
import {ConstantsService} from '../../../../../services/constants.service';

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-apartment-class-list',
  templateUrl: './apartment-class.component.html',
  styleUrls: ['./apartment-class.component.css'],
  providers: [HttpService]
})

export class ApartmentClassComponent extends Unsubscribable implements OnInit {

  @Input() apartmentClass: ApartmentsClass;

  constructor(private http: HttpClient) {
    super();
  }

  title = 'hotel-fe-apartment';
  apartmentClasses: ApartmentsClass[];
  selectedApartmentClass: ApartmentsClass;

  onSelect(apartmentClass: ApartmentsClass): void {
    this.selectedApartmentClass = apartmentClass;
  }

  ngOnInit() {
    this.http.get(URL + '/apartment-class/all').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.apartmentClasses = (res as ApartmentsClass[]);
    });
  }
}

