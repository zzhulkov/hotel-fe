import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hello} from './hello';
import {ApartmentsClass} from './apartmentsClass';
import {HttpService} from './http.service';
import {Subscription} from 'rxjs';

const URL = 'http://localhost:8080';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent implements OnInit, OnDestroy {


  constructor(private http: HttpClient) {
  }
  title = 'hotel-fe';
  hello: Hello;
  apartmentsClasses: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;
  private subscription: Subscription;
  onSelect(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
  }

  ngOnInit() {
    this.subscription = this.http.get(URL + '/hello').subscribe((data: Hello) => {
      console.log(data);
      this.hello = data;
     });
    this.http.get(URL + '/apartments').subscribe((data: ApartmentsClass[]) => {
      console.log(data);
      this.apartmentsClasses = data;
    });
  }

  ngOnClick() {
    this.subscription = this.http.get(URL + '/hello').subscribe((data: Hello) => {
      console.log(data);
      this.hello = data;
     });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

