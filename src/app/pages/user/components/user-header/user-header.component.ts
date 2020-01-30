import {Component, OnDestroy} from "@angular/core";
import {AuthenticationService} from "../../../../modules/authentication/authentication.service";
import {Booking} from "../../../../component/booking";
import {HttpClient} from "@angular/common/http";
import {InnerSubscriber} from "rxjs/internal-compatibility";
import {Unsubscribable} from "../../../../component/Unsubscribable";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-user-header',
    templateUrl: './user-header.component.html',
    styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  authenticated: boolean;
  username: string;
  activeOption = 'hidden';

  constructor(private authService: AuthenticationService) {
    this.authService.currentUserObservable
      .subscribe(user => {
      if (user === null) {
        this.authenticated = false;
      } else {
        this.activeOption = 'hidden';
        this.authenticated = true;
        this.username = user.lastname + ' ' + user.firstname;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  onUsernameClick() {
    this.activeOption = 'watchBookings';
  }

}
