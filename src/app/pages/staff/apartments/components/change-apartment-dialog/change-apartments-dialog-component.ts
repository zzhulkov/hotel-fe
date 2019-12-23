import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = 'http://localhost:8099';

@Component({
  selector: 'app-change-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-apartments-dialog.html',
})
export class ChangeApartmentsDialogComponent {
  profileForm = new FormGroup({
    id: new FormControl(''),
    roomNumber: new FormControl('', Validators.required),
    photo: new FormControl(null),
    description: new FormControl(''),
    status:  new FormControl(''),
    classId: new FormControl(''),
    className: new FormControl(''),
    numberOfRooms: new FormControl(''),
    numberOfCouchette: new FormControl('')
  });

  apartment = new Apartments();
  apartmentClass = new ApartmentsClass();

  constructor(private http: HttpClient) {
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.setApartment();
      this.createApartment();
    }
  }

  createApartment() {
    this.http.put(URL + '/apartments/' + this.apartment.id, this.apartment).subscribe(
    res => {
    console.log(res);
    this.apartment = (res as Apartments);
    });
  }

  setApartment() {
    this.apartmentClass.nameClass = this.profileForm.value.className;
    this.apartmentClass.numberOfCouchette = this.profileForm.value.numberOfCouchette;
    this.apartmentClass.numberOfRooms = this.profileForm.value.numberOfRooms;
    this.apartmentClass.id = this.profileForm.value.classId;
    this.apartment.apartmentClass = this.apartmentClass;
    this.apartment.description = this.profileForm.value.description;
    this.apartment.status = this.profileForm.value.status;
    this.apartment.photo = this.profileForm.value.photo;
    this.apartment.roomNumber = this.profileForm.value.roomNumber;
    this.apartment.id = this.profileForm.value.id;
    console.log(this.apartment);
  }
}



