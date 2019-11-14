import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hello} from './hello';
import {ApartmentClass} from './apartmentClass';
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
  apartmentClasses: ApartmentClass[];
  selectedApartmentClass: ApartmentClass;
  private subscription: Subscription;
  onSelect(apartmentClass: ApartmentClass): void {
    this.selectedApartmentClass = apartmentClass;
  }

  ngOnInit() {
    this.subscription = this.http.get(URL + '/hello').subscribe((data: Hello) => {
      console.log(data);
      this.hello = data;
     });
    this.http.get(URL + '/apartments').subscribe((data: ApartmentClass[]) => {
      console.log(data);
      this.apartmentClasses = data;
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

