import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get('http://localhost:8090/hello');
  }
}
