import {Component} from '@angular/core';
import {HttpService} from '../../http.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  providers: [HttpService]
})

export class UserComponent {

}

