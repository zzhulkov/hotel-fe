import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = 'http://localhost:8099';

@Component({
  selector: 'app-add-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-apartments-dialog.html',
})
export class AddApartmentsDialogComponent {

  constructor(private http: HttpClient) {
    // super();
    this.getAllApartmentsClasses();

  }

  addApartmentForm = new FormGroup({
    roomNumber: new FormControl('', Validators.required),
    photo: new FormControl(null, Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    className: new FormControl(''),
    numberOfRooms: new FormControl(''),
    numberOfCouchette: new FormControl('')
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
    // this.apartmentClass.nameClass = 'Lux';
    //   // this.addApartmentForm.value.className;
    // this.apartmentClass.numberOfCouchette = 2;
    //   // this.addApartmentForm.value.numberOfCouchette;
    // this.apartmentClass.numberOfRooms = 2;
    //   // this.addApartmentForm.value.numberOfRooms;
    // this.apartmentClass.id = 2;
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
    // this.testApartments.id = 2;
    // this.testApartments.nameClass = 'LuxTest';
    // this.testApartments.numberOfRooms = 2;;
    // this.testApartments.numberOfCouchette = 2;
    //
    // this.apartmentsClassesList.push(this.testApartments);

    this.http.get(URL + '/apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }
}



