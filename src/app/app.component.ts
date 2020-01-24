import {Component, OnInit} from '@angular/core';
import {Unsubscribable} from './component/Unsubscribable';
import { Location } from '@angular/common';
import {HttpService} from './http.service';
import {take} from "rxjs/operators";
import {SelectService} from "./services/select.service";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent extends Unsubscribable implements OnInit {

  private userPaths: Array<string> = ['/manager/apartments', '/manager/booking',
    '/manager/services', '/manager/staff', '/manager/tasks', '/manager/apartments-classes'];
  condition: boolean;

  constructor(private location: Location, private missionService: SelectService) {
    super();
  }

  ngOnInit() {
    console.log('init');
    this.missionService.missionAnnounced$
      .pipe(take(10))
      .subscribe( id => { console.log('111111', id);
      });
    if (this.userPaths.includes(this.location.path())) {
      this.condition = false;
    } else {
      this.condition = true;
    }
  }
}
