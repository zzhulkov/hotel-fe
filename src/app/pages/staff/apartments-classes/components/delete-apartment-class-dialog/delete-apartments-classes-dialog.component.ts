import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from "../../../../../services/data-transfer.service";


/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-delete-apartments-classes-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-apartments-classes-dialog.html',
})
export class DeleteApartmentsClassesDialogComponent implements OnInit {

  apartmentClass = new ApartmentsClass();

  deleteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, dataTransfer: DataTransferService) {
    this.apartmentClass = dataTransfer.getData();
  }

  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({
      id: ['', Validators.pattern('^\\d{1,3}$')]
    });
  }

  checkValid() {
    this.deleteForm.markAllAsTouched();
    console.log('FormGroup: ', this.deleteForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.deleteForm.valid ;
  }

  onSubmit() {
    if (this.deleteForm.valid) {
      console.log(this.deleteForm.value);
      this.deleteApartment();
    }
  }

  deleteApartment() {
    this.http.delete(URL + 'apartmentsClasses/' + this.apartmentClass.id, this.deleteForm.value).subscribe(
      res => {
        console.log(res);
      });
  }
}



