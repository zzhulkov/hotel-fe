import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-apartments-classes-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-apartments-classes-dialog.html',
})
export class AddApartmentsClassesDialogComponent implements OnInit {

  addApartmentClassForm: FormGroup;
  apartmentClass = new ApartmentsClass();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.addApartmentClassForm = this.formBuilder.group({
      className: ['', Validators.required],
      numberOfRooms: ['', Validators.pattern('^\\d{1}$')],
      numberOfCouchette: ['', Validators.pattern('^\\d{1}$')]
    });
  }

  checkValid() {
    this.addApartmentClassForm.markAllAsTouched();
    console.log('FormGroup: ', this.addApartmentClassForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addApartmentClassForm.valid;
  }

  onSubmit() {
    if (this.addApartmentClassForm.valid) {
      this.setApartment();
      this.createApartment();
    }
  }

  createApartment() {
    this.http.post(URL + 'apartmentsClasses', this.apartmentClass).subscribe(
      res => {
        console.log(res);
        this.apartmentClass = (res as ApartmentsClass);
      });
  }

  setApartment() {
    this.apartmentClass.nameClass = this.addApartmentClassForm.value.className;
    this.apartmentClass.numberOfRooms = this.addApartmentClassForm.value.numberOfRooms;
    this.apartmentClass.numberOfCouchette = this.addApartmentClassForm.value.numberOfCouchette;
    console.log(this.apartmentClass);
  }
}



