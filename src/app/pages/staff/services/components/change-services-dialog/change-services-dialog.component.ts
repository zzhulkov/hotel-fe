import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Service} from '../../../../../component/service';
import {Unsubscribable} from "../../../../../component/Unsubscribable";
import {SelectService} from "../../../../../services/select.service";
import {ApartmentsClass} from "../../../../../component/apartments-class";
import {Subscription} from "rxjs";
import {DeleteServicesDialogComponent} from "../delete-services-dialog/delete-services-dialog.component";
import {MatDialog} from "@angular/material/dialog";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-services-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-services-dialog.html',
})
@Injectable({
  providedIn: 'root'
})
export class ChangeServicesDialogComponent extends Unsubscribable implements OnInit {

  changeForm: FormGroup;
  service = {} as Service;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, public dialog: MatDialog,
              public selectService: SelectService) {
    super(selectService);
    console.log(this.service);
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      serviceName: [this.service.serviceName, Validators.required],
      price: [this.service.price, Validators.required],
    });
    this.checkValid();
    this.subscription = this.selectService.selectAnnounced$
      .subscribe(row => { console.log(row); this.service = row; this.fillForm(row); });
  }

  fillForm(row: Service) {
    this.changeForm.setValue({
      serviceName: row.serviceName,
      price: row.price
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
      this.setService();
      this.changeService();
    }
  }

  changeService() {
    this.http.put(URL + 'bookingAddServices/' + this.service.id, this.service).subscribe(
      res => {
        console.log(res);
        this.service = (res as Service);
      });
  }

  setService() {
    this.service.serviceName = this.changeForm.value.serviceName;
    this.service.price = this.changeForm.value.price;
    console.log(this.service);
  }


  deleteDialog() {
    const dialogRef = this.dialog.open(DeleteServicesDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



