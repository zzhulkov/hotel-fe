import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {DataTransferService} from '../../../../../services/data-transfer.service';
import {Service} from '../../../../../component/service';

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
export class ChangeServicesDialogComponent implements OnInit {

  changeForm: FormGroup;
  service = {} as Service;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, dataTransfer: DataTransferService) {
    this.service = dataTransfer.getData();
    console.log(this.service);
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      serviceName: [this.service.serviceName, Validators.required],
      price: [this.service.price, Validators.required],
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
}



