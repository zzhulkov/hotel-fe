import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../../../../../services/constants.service';
import {Service} from '../../../../../component/service';

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-services-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-services-dialog.html',
})
export class AddServicesDialogComponent implements OnInit {

  addServiceForm: FormGroup;
  service = {} as Service;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.addServiceForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  checkValid() {
    this.addServiceForm.markAllAsTouched();
    console.log('FormGroup: ', this.addServiceForm.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addServiceForm.valid;
  }

  onSubmit() {
    if (this.addServiceForm.valid) {
      this.setService();
      this.createService();
    }
  }

  createService() {
    this.http.post(URL + 'bookingAddServices', this.service).subscribe(
      res => {
        console.log(res);
        this.service = (res as Service);
      });
  }

  setService() {
    this.service.serviceName = this.addServiceForm.value.serviceName;
    this.service.price = this.addServiceForm.value.price;
    console.log(this.service);
  }
}



