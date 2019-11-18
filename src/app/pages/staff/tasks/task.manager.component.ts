import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';


@Component({
  selector: 'app-staff-tasks',
  templateUrl: './task.manager.component.html',
  styleUrls: ['./task.manager.component.css'],
  providers: [HttpService]
})

export class TaskManagerComponent {

}

