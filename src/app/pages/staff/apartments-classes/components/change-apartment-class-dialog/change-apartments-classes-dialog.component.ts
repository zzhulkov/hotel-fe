import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Apartments} from '../../../../../component/apartments';
import {ApartmentsClass} from '../../../../../component/apartments-class';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {DeleteApartmentsClassesDialogComponent} from "../delete-apartment-class-dialog/delete-apartments-classes-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Unsubscribable} from "../../../../../component/Unsubscribable";
import {Subscription} from "rxjs";
import {SelectService} from "../../../../../services/select.service";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-apartments-classes-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-apartments-classes-dialog.html',
})
@Injectable({
  providedIn: 'root'
})
export class ChangeApartmentsClassesDialogComponent extends Unsubscribable implements OnInit {

  changeForm: FormGroup;
  subscription: Subscription;
  apartmentClass = {} as ApartmentsClass;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient, public selectService: SelectService) {
    super(selectService);
    console.log(this.apartmentClass);
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      nameClass: [this.apartmentClass.nameClass, Validators.required],
      numberOfRooms: [this.apartmentClass.numberOfRooms, Validators.pattern('^\\d{1}$')],
      numberOfCouchette: [this.apartmentClass.numberOfCouchette, Validators.pattern('^\\d{1}$')]
    });
    this.checkValid();
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(row => { console.log(row); this.fillForm(row); });
  }

  fillForm(row: ApartmentsClass) {
    this.changeForm.setValue({
      nameClass: row.nameClass,
      numberOfRooms: row.numberOfRooms,
      numberOfCouchette:  row.numberOfCouchette,
    });
  }

  checkValid() {
    this.changeForm.markAllAsTouched();
    console.log('FormGroup: ', this.changeForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.changeForm.valid;
  }

  onSubmit() {
    if (this.changeForm.valid) {
      this.setApartment();
      this.changeApartment();
    }
  }

  changeApartment() {
    this.http.put(URL + 'apartmentsClasses/' + this.apartmentClass.id, this.apartmentClass).subscribe(
      res => {
        console.log(res);
        this.apartmentClass = (res as ApartmentsClass);
      });
  }

  setApartment() {
    this.apartmentClass.nameClass = this.changeForm.value.nameClass;
    this.apartmentClass.numberOfRooms = this.changeForm.value.numberOfRooms;
    this.apartmentClass.numberOfCouchette = this.changeForm.value.numberOfCouchette;
    console.log(this.apartmentClass);
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteApartmentsClassesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



