import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Apartments} from '../../../../../component/apartments';
import {ConstantsService} from '../../../../../services/constants.service';
import {UnavailableApartment} from '../../../../../component/unavailable-apartment';
import {Subscription} from 'rxjs';
import {SelectService} from '../../../../../services/select.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {DatePipe} from "@angular/common";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-unavailable-apartment-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-unavailable-apartment-dialog.html',
})
export class AddUnavailableApartmentDialogComponent extends Unsubscribable implements OnInit {

  addForm: FormGroup;

  unavailableApartment = {} as UnavailableApartment;
  subscription: Subscription;


  apartmentsList: Apartments[];
  selectedApartment: Apartments;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              public selectService: SelectService, private datePipe: DatePipe) {
    super(selectService);
    this.getAllApartments();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      apartment: ['', Validators.required],
      causeDescription: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.checkValid();
  }


  checkValid() {
    this.addForm.markAllAsTouched();
    console.log('FormGroup: ', this.addForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addForm.valid;
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.setUnavailableApartment();
    }
  }

  setUnavailableApartment() {
    const startDateCleaned = this.datePipe.transform(this.addForm.value.startDate, 'yyyy-MM-dd');
    const endDateCleaned = this.datePipe.transform(this.addForm.value.endDate, 'yyyy-MM-dd');
    this.addForm.patchValue({
      startDate: startDateCleaned,
      endDate: endDateCleaned});
    this.unavailableApartment.apartment = this.selectedApartment;
    this.unavailableApartment.startDate = this.addForm.value.startDate;
    this.unavailableApartment.endDate = this.addForm.value.endDate;
    this.unavailableApartment.causeDescription = this.addForm.value.causeDescription;
    this.createUnavailableApartment();
  }

  onSelectApartment(apartments: Apartments): void {
    this.selectedApartment = apartments;
    console.log(this.selectedApartment);
  }

  getAllApartments() {
    this.http.get(URL + 'apartments').subscribe(res => {
      console.log(res);
      this.apartmentsList = (res as Apartments[]);
    });
  }

  createUnavailableApartment() {
    this.http.post(URL + 'unavailableApartments/', this.unavailableApartment).subscribe(
      res => {
        console.log(res);
        this.unavailableApartment = (res as UnavailableApartment);
      });
  }
}



