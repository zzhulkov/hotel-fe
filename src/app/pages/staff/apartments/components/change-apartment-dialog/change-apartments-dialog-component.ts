import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'app-change-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-apartments-dialog.html',
})
export class ChangeApartmentsDialogComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: ['', Validators.pattern('^\\d{1,4}$')],
      roomNumber: ['', Validators.pattern('^\\d{1,3}$')],
      photo: ['', Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')],
      description: [''],
      status:  [''],
      classId: ['', Validators.pattern('^\\d{1,4}$')],
      className: ['', Validators.pattern('^([a-zA-Z])\\S+$')],
      numberOfRooms: ['', Validators.pattern('^\\d{1}$')],
      numberOfCouchette: ['', Validators.pattern('^\\d{1}$')]
    });
  }

  checkValid() {
    this.profileForm.markAllAsTouched();
    console.log('FormGroup: ', this.profileForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.profileForm.valid ;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}



