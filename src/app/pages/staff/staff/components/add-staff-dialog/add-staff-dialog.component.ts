import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../../../../../component/staff';
import {User} from '../../../../../component/user';
import {ConstantsService} from '../../../../../services/constants.service';
import {Roles} from "../../../../../component/roles.type";
import {Speciality} from "../../../../../component/speciality.type";

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

  constructor(private formBuilder: FormBuilder, private  http: HttpClient) {
  }

  addStaffFrom: FormGroup;
  staff = {} as Staff;
  user = {} as User;
  roles = [
    'Manager',
    'Administrator',
    'Client',
    'Worker'
  ];
  private selectedRole: Roles;
  specialities = [
    'Cleaner',
    'Handyman',
    'Manager',
    'Hotel_Administrator'
  ];
  private selectedSpeciality: Speciality;

  uList: User[];

  ngOnInit(): void {
    this.addStaffFrom = this.formBuilder.group({
      email: ['', Validators.pattern('^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+\\@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-]+$')],
      role: [''],
      active: ['true'],
      speciality: [''],
    });
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
      this.getUser();
      // console.log(this.addStaffFrom.value);
    }
  }

  onSelectRole(roles: any): void {
    this.selectedRole = roles;
    console.log(this.selectedRole);
  }

  onSelectSpec(spec: any): void {
    this.selectedSpeciality = spec;
    console.log(this.selectedSpeciality);
  }

  createStaff() {
    this.http.post(URL + 'staff', this.staff).subscribe(
      res => {
        console.log(res);
        this.staff = (res as Staff);

        this.updateUser();
      });
  }

  getUser() {
    this.http.get(URL + 'users' + '?email=' + this.addStaffFrom.value.email).subscribe(
      res => {
        console.log(res);
        this.uList = (res as User[]);
        this.user = this.uList[0];
        console.log(this.user);
        this.setStaff();
        this.createStaff();
      });
  }

  updateUser() {
    this.user.userRole = this.selectedRole;
    this.http.put(URL + 'users/' + this.user.id, this.user).subscribe(
      res => {
        console.log(res);

      });
  }

  setStaff() {
    this.staff.id = this.user.id;
    this.staff.user = this.user;
    this.staff.active = this.addStaffFrom.value.active;
    this.staff.speciality = this.selectedSpeciality;
    console.log(this.staff);
  }
}



