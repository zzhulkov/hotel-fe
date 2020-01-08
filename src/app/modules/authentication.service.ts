import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  login(username: string, password: string) {
    // TODO: CHANGE URL
    console.log(username);
    const response = this.http.get('http://localhost:8181/authenticate?'
                                  + 'username=' + username
                                  + '&password=' + password);

    response.subscribe(v => console.log(v));
    // console.log(a);
  }

}
