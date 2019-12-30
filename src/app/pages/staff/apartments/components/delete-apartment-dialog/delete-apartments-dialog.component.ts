import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';


/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-apartments-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-apartments-dialog.html',
})
export class DeleteApartmentsDialogComponent implements OnInit {

  apartment = new Apartments();
  apartmentClass = new ApartmentsClass();

  deleteApartmentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.deleteApartmentForm = this.formBuilder.group({
      id: ['', Validators.pattern('^\\d{1,3}$')]
    });
  }

  checkValid() {
    this.deleteApartmentForm.markAllAsTouched();
    console.log('FormGroup: ', this.deleteApartmentForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.deleteApartmentForm.valid ;
  }

  onSubmit() {
    if (this.deleteApartmentForm.valid) {
      console.log(this.deleteApartmentForm.value);
      this.deleteApartment();
    }
  }

  deleteApartment() {
    this.http.delete(URL + 'apartments/' + this.deleteApartmentForm.value.id, this.deleteApartmentForm.value).subscribe(
      res => {
        console.log(res);
      });
  }
}



