import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {DataTransferService} from '../../../../../services/data-transfer.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-apartments-dialog.html',
})

export class ChangeApartmentsDialogComponent extends Unsubscribable implements OnInit {

  profileForm: FormGroup;

  apartment = {} as Apartments;
  apartmentClass = {} as ApartmentsClass;

  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;

  constructor(private formBuilder: FormBuilder, private  http: HttpClient, dataTransfer: DataTransferService) {
    super();
    this.getAllApartmentsClasses();
    this.apartment = dataTransfer.getData();
    this.selectedApartmentsClass = this.apartment.apartmentClass;
  }


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      id: [this.apartment.id, Validators.pattern('^\\d{1,4}$')],
      roomNumber: [this.apartment.roomNumber, Validators.pattern('^\\d{1,3}$')],
      photo: [this.apartment.photo, Validators.pattern(
        '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')],
      description: [this.apartment.description],
      status: [this.apartment.status],
      nameClass: [this.apartment.apartmentClass.nameClass]
    });
    this.checkValid();
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

  onSelect(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses/').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }
}



