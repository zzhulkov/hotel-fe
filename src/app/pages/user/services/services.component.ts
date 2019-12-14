import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [HttpService]
})

export class ServicesComponent {

}

