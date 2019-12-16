import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'app-change-staff-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-staff-dialog.html',
})
export class ChangeStaffDialogComponent {
  changeStaffFrom = new FormGroup({
    firstName: new FormControl('', Validators.pattern('^([A-Z]){1}([a-z]+)$')),
    lastName: new FormControl('', Validators.pattern('^([A-Z]){1}([a-z]+)$')),
    email: new FormControl('', Validators.pattern('^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+\\@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')),
    phone: new FormControl('', Validators.pattern('(^\\+{1}\\d{7,10}$)|(^\\d{7,10}$)')),
    login: new FormControl('', Validators.pattern('^([a-zA-Z])\\S+$')),
    isActive: new FormControl(''),
    speciality: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.changeStaffFrom.valid) {
      console.log(this.changeStaffFrom.value);
    }
  }
}



