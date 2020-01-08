import {Component} from '@angular/core';
import {HttpService} from '../../http.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  providers: [HttpService]
})

export class UserComponent {

  authenticationState = 'hidden';
  username = 'Vladimir';
  images: string[] = ['https://q-cf.bstatic.com/images/hotel/max1024x768/306/30607234.jpg',
    'https://www3.hilton.com/resources/media/hi/KBPHIHI/en_US/img/shared/full_page_image_gallery/main/HL_sideext_1270x560_FitToBoxSmallDimension_UpperCenter.jpg',
    'https://www3.hilton.com/resources/media/hi/KBPHIHI/en_US/img/shared/full_page_image_gallery/main/HL_pool01_21_1270x560_FitToBoxSmallDimension_Center.jpg'];
}

