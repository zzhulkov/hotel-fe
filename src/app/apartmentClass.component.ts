import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {ApartmentClass} from './apartmentClass';


@Component({
  selector: 'app-root',
  templateUrl: './apartmentClass.component.html',
  providers: [HttpService]
})

export class ApartmentClassComponent implements OnInit {

  @Input() apartmentClass: ApartmentClass;

  constructor() { }

  ngOnInit() {
  }
}

