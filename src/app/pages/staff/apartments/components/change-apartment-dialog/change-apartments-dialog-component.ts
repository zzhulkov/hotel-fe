import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'app-change-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-apartments-dialog.html',
})
export class ChangeApartmentsDialogComponent {
  profileForm = new FormGroup({
    roomNumber: new FormControl('', Validators.pattern('^\\d{1,3}$')),
    photo: new FormControl(null, Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')),
    description: new FormControl(''),
    status:  new FormControl(''),
    className: new FormControl(''),
    numberOfRooms: new FormControl('', Validators.pattern('^\\d{1}$')),
    numberOfCouchette: new FormControl('', Validators.pattern('^\\d{1}$'))
  });

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}



