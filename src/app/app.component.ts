import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hello} from './hello';
import {HttpService} from './http.service';

const URL = 'http://localhost:8080';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent implements OnInit {
  title = 'hotel-fe';
  hello: Hello;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(URL + '/hello').subscribe((data: Hello) => {
      console.log(data);
      this.hello = data;
    });
  }

  ngOnClick() {
    this.http.get(URL + '/hello').subscribe((data: Hello) => {
      console.log(data);
      this.hello = data;
    });
  }
}
