import {Component} from '@angular/core';
import {HttpService} from '../../../http.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['../styles/page.css'],
  providers: [HttpService]
})

export class UserManagerComponent {
  constructor(public dialog: MatDialog) {
  }
}

