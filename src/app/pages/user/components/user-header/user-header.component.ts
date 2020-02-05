import {Component} from "@angular/core";
import {AuthenticationService} from "../../../../modules/authentication/authentication.service";
import {ConstantsService} from "../../../../services/constants.service";

const BASE_URL = new ConstantsService().BASE_URL;

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
