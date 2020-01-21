import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../../../../../component/staff';
import {User} from '../../../../../component/user';
import {ConstantsService} from '../../../../../services/constants.service';

/**
 * @title Dialog with header, scrollable content and actions
 */
const URL = new ConstantsService().BASE_URL;

@Component({
  selector: 'app-add-staff-dialog',
  styleUrls: ['../../../styles/change-dialog.css'],
  templateUrl: './add-staff-dialog.html',
})
export class AddStaffDialogComponent implements OnInit {

  addStaffFrom: FormGroup;
  staff = {} as Staff;
  user = {} as User;
  roles = [
    'MANAGER',
    'ADMIN',
    'USER',
    'WORKER'
  ];

  ngOnInit(): void {
    this.addStaffFrom = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+\\@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')],
      role: [''],
      active: ['true'],
      speciality: [''],
    });
  }

  constructor(private formBuilder: FormBuilder, private  http: HttpClient) {
  }

  checkValid() {
    this.addStaffFrom.markAllAsTouched();
    console.log('FormGroup: ', this.addStaffFrom.valid);
  }

  isSubmitDisabled(): boolean {
    return !this.addStaffFrom.valid ;
  }

  onSubmit() {
    if (this.addStaffFrom.valid) {
      this.setStaff();
      this.createStaff();
      console.log(this.addStaffFrom.value);
    }
  }

  createStaff() {
    this.createUser();

    this.http.post(URL + 'staff/', this.staff).subscribe(
      res => {
        console.log(res);
        this.staff = (res as Staff);
      });
  }

  createUser() {
    this.http.post(URL + 'users/', this.user).subscribe(
      res => {
        console.log(res);
        this.user = (res as User);
      });
  }

  setStaff() {
    this.staff = this.user as Staff;
    this.staff.active = this.addStaffFrom.value.active;
    this.staff.speciality = this.addStaffFrom.value.speciality;
    console.log(this.staff);
  }
}



