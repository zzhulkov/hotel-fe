import {Component} from '@angular/core';
import {HttpService} from '../../http.service';
import {AuthenticationService} from "../../modules/authentication/authentication.service";
import {User} from "../../component/user";


@Component({
  selector: 'app-staff',
  templateUrl: './staff.html',
  styleUrls: ['./staff.css'],
  providers: [HttpService]
})

export class StaffComponent {

  logged = false;
  canAccess = false;
  username: string;

  constructor(private authService: AuthenticationService) {
    this.authService.currentUserObservable
      .subscribe((user: User) => {
        this.logged = user !== null;
        if (this.logged) {
          this.username = user.firstname + ' ' + user.lastname;
          this.canAccess = user.userRole === 'Manager' || user.userRole === 'Administrator';
        }
      });
  }

  logout() {
    this.logged = false;
    this.canAccess = false;
    this.authService.logout();
  }

}

