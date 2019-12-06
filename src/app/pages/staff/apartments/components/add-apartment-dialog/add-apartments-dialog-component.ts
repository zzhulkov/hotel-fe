import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'app-add-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-apartments-dialog.html',
})
export class AddApartmentsDialogComponent {
  addApartmentForm = new FormGroup({
    roomNumber: new FormControl('', Validators.required),
    photo: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    status:  new FormControl('', Validators.required),
    className: new FormControl('', Validators.required),
    numberOfRooms: new FormControl('', Validators.required),
    numberOfCouchette: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.addApartmentForm.valid) {
      console.log(this.addApartmentForm.value);
    }
  }
}



