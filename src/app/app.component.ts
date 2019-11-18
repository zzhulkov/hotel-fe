import {Component} from '@angular/core';
import {Unsubscribable} from './component/Unsubscribable';
import {HttpService} from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent extends Unsubscribable {
}
