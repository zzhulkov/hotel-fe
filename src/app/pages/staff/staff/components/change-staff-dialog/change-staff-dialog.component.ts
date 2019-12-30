import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../../../../../component/staff';
import {User} from '../../../../../component/user';
import {DataTransferService} from "../../../../../services/data-transfer.service";
import {ConstantsService} from "../../../../../services/constants.service";

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
  staff = new Staff();
  user = new User();

  ngOnInit(): void {
    this.changeStaffFrom = this.formBuilder.group({
      firstName: [this.staff.user.firstname, Validators.pattern('^([A-Z]){1}([a-z]+)$')],
      lastName: [this.staff.user.lastname, Validators.pattern('^([A-Z]){1}([a-z]+)$')],
      email: [this.staff.user.email, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+\\@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')],
      phone: [this.staff.user.phoneNumber, Validators.pattern('(^\\+{1}\\d{7,13}$)|(^\\d{7,13}$)')],
      login: [this.staff.user.login, Validators.pattern('^([a-zA-Z])\\S+$')],
      active: [this.staff.active],
      speciality: [this.staff.speciality],
    });
  }

  constructor(private formBuilder: FormBuilder, private  http: HttpClient, dataTransfer: DataTransferService) {
    this.staff = dataTransfer.getData();
    this.user = this.staff.user;
    console.log(this.staff);
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
    this.setUser();
    this.createUser();

    this.http.put(URL + 'staff/' + this.staff.id, this.staff).subscribe(
      res => {
        console.log(res);
        this.staff = (res as Staff);
      });
  }

  createUser() {
    this.http.put(URL + 'user/' + this.user.id, this.user).subscribe(
      res => {
        console.log(res);
        this.user = (res as User);
      });
  }

  setStaff() {
    this.staff.user = this.user;
    this.staff.active = this.changeStaffFrom.value.active;
    this.staff.speciality = this.changeStaffFrom.value.speciality;
    console.log(this.staff);
  }

  setUser() {
    this.user.firstname = this.changeStaffFrom.value.firstname;
    this.user.lastname = this.changeStaffFrom.value.lastname;
    this.user.email = this.changeStaffFrom.value.email;
    this.user.phoneNumber = this.changeStaffFrom.value.phone;
    this.user.login = this.changeStaffFrom.value.login;
  }
}



