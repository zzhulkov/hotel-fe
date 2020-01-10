import {Component} from '@angular/core';
import {HttpService} from '../../http.service';
import {AuthenticationService} from '../../modules/authentication.service';
import {Apartments} from '../../component/apartments';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  providers: [HttpService]
})

export class UserComponent {

  apartments: Apartments;

  authenticated: boolean;
  username: string;
  authService: AuthenticationService;
  authenticationState = 'hidden';
  images: string[] = ['https://q-cf.bstatic.com/images/hotel/max1024x768/306/30607234.jpg',
    'https://www3.hilton.com/resources/media/hi/KBPHIHI/en_US/img/shared/full_page_image_gallery/main/HL_sideext_1270x560_FitToBoxSmallDimension_UpperCenter.jpg',
    'https://www3.hilton.com/resources/media/hi/KBPHIHI/en_US/img/shared/full_page_image_gallery/main/HL_pool01_21_1270x560_FitToBoxSmallDimension_Center.jpg'];

  constructor(authService: AuthenticationService, private http: HttpClient) {
    this.authService = authService;
    this.authService.currentUserObservable.subscribe(user => {
      if (user === null) {
        this.authenticated = false;
      } else {
        this.authenticationState = 'logged';
        this.authenticated = true;
        this.username = user.lastname + ' ' + user.firstname;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  getApartments() {
    this.http.get('http://localhost:8090/apartments/2').subscribe(
      data => {
        this.apartments = (data as Apartments);
      },
      error => {
        this.apartments = null;
        console.log(error);
      }
    );
  }
}

