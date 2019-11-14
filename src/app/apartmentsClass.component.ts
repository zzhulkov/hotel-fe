import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from './http.service';
import {Subscription} from 'rxjs';
import {ApartmentsClass} from './apartmentsClass';


@Component({
  selector: 'app-root',
  templateUrl: './apartmentsClass.component.html',
  providers: [HttpService]
})

export class ApartmentsClassComponent implements OnInit {

  @Input() apartmentsClass: ApartmentsClass;

  constructor() { }

  ngOnInit() {
  }
}

