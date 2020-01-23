import {Component, OnInit} from '@angular/core';
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
  selector: 'app-delete-services-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './delete-services-dialog.html',
})
export class DeleteServicesDialogComponent implements OnInit {

  service = {} as Service;

  deleteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, dataTransfer: DataTransferService) {
    this.service = dataTransfer.getData();
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
    return !this.deleteForm.valid;
  }

  onSubmit() {
    if (this.deleteForm.valid) {
      console.log(this.deleteForm.value);
      this.deleteService();
    }
  }

  deleteService() {
    this.http.delete(URL + 'bookingAddServices/' + this.service.id, this.deleteForm.value).subscribe(
      res => {
        console.log(res);
      });
  }
}



