import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {ApartmentClass} from './apartmentClass';
import {Unsubsribable} from './component/Unsubsribable';
import {takeUntil} from 'rxjs/operators';


const URL = 'http://localhost:8080';

@Component({
  selector: 'app-root',
  templateUrl: './apartmentClass.component.html',
  providers: [HttpService]
})

export class ApartmentClassComponent extends Unsubsribable{

  constructor(private http: HttpClient) {
    super();
  }


  @Input() apartmentClass: ApartmentClass;

}

