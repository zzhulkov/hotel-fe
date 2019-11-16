import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hello} from './hello';
import {ApartmentClass} from './apartmentClass';
import {HttpService} from './http.service';
import {Subscription} from 'rxjs';
import {Unsubsribable} from './component/Unsubsribable';
import {takeUntil} from 'rxjs/operators';

const URL = 'http://localhost:8080';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent extends Unsubsribable implements OnInit{

  constructor(private http: HttpClient) {
    super();
  }

  title = 'hotel-fe';
  hello: Hello;
  apartmentClasses: ApartmentClass;
  selectedApartmentClass: ApartmentClass;
  private subscription: Subscription;

  onSelect(apartmentClass: ApartmentClass): void {
    this.selectedApartmentClass = apartmentClass;
  }

  ngOnInit(): void {
    this.http.get('/hello').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.hello = (res as Hello);
    });

    this.http.get(URL + '/apartments').pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log(res);
      this.apartmentClasses = (res as ApartmentClass);
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

