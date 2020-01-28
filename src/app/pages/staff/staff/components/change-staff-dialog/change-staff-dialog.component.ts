import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../../../../../component/staff';
import {User} from '../../../../../component/user';
import {DataTransferService} from "../../../../../services/data-transfer.service";
import {ConstantsService} from "../../../../../services/constants.service";
import {Unsubscribable} from "../../../../../component/Unsubscribable";
import {Speciality} from "../../../../../component/speciality.type";

/**
 * @title Dialog with header, scrollable content and actions
 */

const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-change-staff-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './change-staff-dialog.html',
})
export class ChangeStaffDialogComponent implements OnInit {
  changeStaffFrom: FormGroup;
  staff = {} as Staff;
  user = {} as User;

  specialities = [
    'Cleaner',
    'Handyman',
    'Manager',
    'Hotel_Administrator'
  ];
  selectedSpeciality: Speciality;

  constructor(private formBuilder: FormBuilder, private  http: HttpClient, dataTransfer: DataTransferService) {
    this.staff = dataTransfer.getData();
    this.selectedSpeciality = this.staff.speciality;
  }

  ngOnInit(): void {
    this.changeStaffFrom = this.formBuilder.group({
      id: [this.staff.id, Validators.pattern('^\\d{1,4}$')],
      firstname: [{value: this.staff.user.firstname, disabled: true}],
      lastname: [{value: this.staff.user.lastname, disabled: true}],
      active: [this.staff.active],
      speciality: [this.staff.speciality],
    });
    this.checkValid();
  }

  onSelectSpec(spec: any): void {
    this.selectedSpeciality = spec;
    console.log(this.selectedSpeciality);
  }

  checkValid() {
    this.changeStaffFrom.markAllAsTouched();
    console.log('FormGroup: ', this.changeStaffFrom.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.changeStaffFrom.valid ;
  }

  onSubmit() {
    if (this.changeStaffFrom.valid) {
      this.setStaff();
      this.createStaff();
    }
  }

  createStaff() {
    this.http.put(URL + 'staff/' + this.staff.id, this.staff).subscribe(
      res => {
        console.log(res);
        this.staff = (res as Staff);
      });
  }

  setStaff() {
    this.staff.active = this.changeStaffFrom.value.active;
    this.staff.speciality = this.selectedSpeciality;
    console.log(this.staff);
  }
}



