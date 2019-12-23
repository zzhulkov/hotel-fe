import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-apartments-dialog.html',
})
export class AddApartmentsDialogComponent {

  constructor(private http: HttpClient) {
    this.getAllApartmentsClasses();
  }

  addApartmentForm = new FormGroup({
    roomNumber: new FormControl('', Validators.pattern('^\\d{1,3}$')),
    photo: new FormControl(null, Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    className: new FormControl('', Validators.required),
    numberOfRooms: new FormControl('', Validators.pattern('^\\d{1}$')),
    numberOfCouchette: new FormControl('', Validators.pattern('^\\d{1}$'))
  });

  apartment = new Apartments();
  apartmentClass = new ApartmentsClass();

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  onSubmit() {
    if (this.addApartmentForm.valid) {
      this.setApartment();
      this.createApartment();
    }
  }

  createApartment() {
    this.http.post(URL + '/apartments', this.apartment).subscribe(
      res => {
        console.log(res);
        this.apartment = (res as Apartments);
      });
  }

  setApartment() {
    this.apartment.apartmentClass = this.selectedApartmentsClass;
    this.apartment.description = this.addApartmentForm.value.description;
    this.apartment.status = this.addApartmentForm.value.status;
    this.apartment.photo = this.addApartmentForm.value.photo;
    this.apartment.roomNumber = this.addApartmentForm.value.roomNumber;
    console.log(this.apartment);
  }

  onSelect(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
  }

  getAllApartmentsClasses() {
    this.http.get(URL + '/apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }
}



