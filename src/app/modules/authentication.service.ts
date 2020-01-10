import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {User} from '../component/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public token: string;
  public currentUser: Observable<User>;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.token = localStorage.getItem('token');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserObservable(): Observable<User> {
    return this.currentUser;
  }

  public get currentUserObject(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // TODO: CHANGE URLS
    const response = this.http.get('http://localhost:8090/authenticate?'
                                  + 'username=' + username
                                  + '&password=' + password);
    response.subscribe(
      data => {
          if (data.hasOwnProperty('token')) {
            const tok = (data as {token});
            console.log('Curr token:' + tok.token);
            this.token = tok.token;
            localStorage.setItem('token', tok.token);
            if (isNotNullOrUndefined(tok)) {
              this.http.get('http://localhost:8090/user?login=' + username)
                .subscribe(
                  resp => {
                    this.currentUserSubject.next((resp as User));
                    localStorage.setItem('user', JSON.stringify(resp as User));
                  },
                  error => {
                    console.log('Вот теперь нам точно жопа');
                  }
                );
            }
          }
      },
      error => console.log(error)
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.token = null;
  }

}
