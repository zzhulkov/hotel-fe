import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'app-change-staff-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-staff-dialog.html',
})
export class ChangeStaffDialogComponent implements OnInit {

  changeStaffFrom: FormGroup;

  ngOnInit(): void {
    this.changeStaffFrom = this.formBuilder.group({
      firstName: ['', Validators.pattern('^([A-Z]){1}([a-z]+)$')],
      lastName: ['', Validators.pattern('^([A-Z]){1}([a-z]+)$')],
      email: ['', Validators.pattern('^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+\\@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')],
      phone: ['', Validators.pattern('(^\\+{1}\\d{7,13}$)|(^\\d{7,13}$)')],
      login: ['', Validators.pattern('^([a-zA-Z])\\S+$')],
    });
  }

  constructor(private formBuilder: FormBuilder) {
  }

  checkValid() {
    this.changeStaffFrom.markAllAsTouched();
    console.log('FormGroup: ', this.changeStaffFrom.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.changeStaffFrom.valid ;
  }

  onSubmit() {
    if (this.changeStaffFrom.valid) {
      console.log(this.changeStaffFrom.value);
    }
  }
}



