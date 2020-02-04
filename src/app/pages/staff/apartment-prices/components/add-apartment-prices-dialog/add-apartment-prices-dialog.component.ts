import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {ConstantsService} from '../../../../../services/constants.service';
import {ApartmentPrice} from '../../../../../component/apartment-price';
import {Subscription} from 'rxjs';
import {SelectService} from '../../../../../services/select.service';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {DatePipe} from "@angular/common";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-apartment-prices-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-apartment-prices-dialog.html',
})
export class AddApartmentPricesDialogComponent extends Unsubscribable implements OnInit {

  addForm: FormGroup;

  apartmentPrice = {} as ApartmentPrice;
  subscription: Subscription;


  apartmentsClassesList: ApartmentsClass[];
  selectedApartmentsClass: ApartmentsClass;
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private http: HttpClient,
              public selectService: SelectService, private datePipe: DatePipe) {
    super(selectService);
    this.getAllApartmentsClasses();
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      nameClass: ['', Validators.required],
      price: ['', Validators.pattern('(\\d+)')],
      startPeriod: ['', Validators.required],
      endPeriod: ['', Validators.required]
    });

    this.checkValid();
  }

  fillForm(row: ApartmentPrice) {
    this.addForm.setValue({
      nameClass: row.apartmentClass.nameClass,
      startPeriod: row.startPeriod,
      endPeriod: row.endPeriod,
      totalPrice: row.price
    });
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
      this.setApartmentPrice();
    }
  }

  setApartmentPrice() {
    this.apartmentPrice.apartmentClass = this.selectedApartmentsClass;
    this.apartmentPrice.startPeriod = this.addForm.value.startPeriod;
    this.apartmentPrice.endPeriod = this.addForm.value.endPeriod;
    this.apartmentPrice.price = this.addForm.value.price;
    this.createApartmentPrice();
  }

  onSelectAprtmntClass(apartmentsClass: ApartmentsClass): void {
    this.selectedApartmentsClass = apartmentsClass;
    console.log(this.selectedApartmentsClass);
  }

  getAllApartmentsClasses() {
    this.http.get(URL + 'apartmentsClasses').subscribe(res => {
      console.log(res);
      this.apartmentsClassesList = (res as ApartmentsClass[]);
    });
  }

  createApartmentPrice() {
    const startDateCleaned = this.datePipe.transform(this.addForm.value.startPeriod, 'yyyy-MM-dd');
    const endDateCleaned = this.datePipe.transform(this.addForm.value.endPeriod, 'yyyy-MM-dd');
    this.addForm.patchValue({
      startPeriod: startDateCleaned,
      endPeriod: endDateCleaned});
    this.http.post(URL + 'apartmentPrices/', this.apartmentPrice).subscribe(
      res => {
        console.log(res);
        this.apartmentPrice = (res as ApartmentPrice);
      });
  }
}



