import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../../../../http.service';
import {ApartmentClass} from '../../../../../component/apartment-class';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {takeUntil} from 'rxjs/operators';

const URL = 'http://localhost:8090';

@Component({
  selector: 'app-apartment-class-list',
  templateUrl: './apartment-class.component.html',
  styleUrls: ['./apartment-class.component.css'],
  providers: [HttpService]
})

export class ApartmentClassComponent extends Unsubscribable implements OnInit {

  @Input() apartmentClass: ApartmentClass;

  constructor(private http: HttpClient) {
    super();
  }

  title = 'hotel-fe-apartment';
  apartmentClasses: ApartmentClass[];
  selectedApartmentClass: ApartmentClass;

  onSelect(apartmentClass: ApartmentClass): void {
    this.selectedApartmentClass = apartmentClass;
  }

  ngOnInit() {
    this.http.get(URL + '/apartment-class/all').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.apartmentClasses = (res as ApartmentClass[]);
    });
  }
}

