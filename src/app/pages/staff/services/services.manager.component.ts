import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';


@Component({
  selector: 'app-services-manager',
  templateUrl: './services.manager.component.html',
  styleUrls: ['./services.manager.component.css'],
  providers: [HttpService]
})

export class ServicesManagerComponent {

}

