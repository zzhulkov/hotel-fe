import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-apartments-dialog.html',
})
export class ChangeApartmentsDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private  http: HttpClient) {
    this.getAllApartmentsClasses();
  }

  profileForm: FormGroup;


  apartment = new Apartments();
  apartmentClass = new ApartmentsClass();

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: ['', Validators.pattern('^\\d{1,4}$')],
      roomNumber: ['', Validators.pattern('^\\d{1,3}$')],
      photo: ['', Validators.pattern('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')],
      description: [''],
      status:  [''],
      // classId: ['', Validators.pattern('^\\d{1,4}$')],
      // className: ['', Validators.pattern('^([a-zA-Z])\\S+$')],
      numberOfRooms: [''
        //, Validators.pattern('^\\d{1}$')
        ],
      numberOfCouchette: [''
        //, Validators.pattern('^\\d{1}$')
        ]
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
      this.setApartment();
      this.createApartment();
    }
  }

  createApartment() {
    this.http.put(URL + 'apartments/' + this.apartment.id, this.apartment).subscribe(
    res => {
    console.log(res);
    this.apartment = (res as Apartments);
    });
  }

  setApartment() {
    this.apartment.apartmentClass = this.selectedApartmentsClass;
    this.apartment.description = this.profileForm.value.description;
    this.apartment.status = this.profileForm.value.status;
    this.apartment.photo = this.profileForm.value.photo;
    this.apartment.roomNumber = this.profileForm.value.roomNumber;
    this.apartment.id = this.profileForm.value.id;
    console.log(this.apartment);
  }

  changeStatus(value) {
    this.profileForm.value.status = value;
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



