import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {ShareService} from '../staff-table/share-service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, map, takeUntil} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {merge, Observable} from 'rxjs';


const URL = 'http://localhost:8080';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'staff-filter-component',
  styleUrls: ['../../../styles/table.css'],
  templateUrl: 'staff-filter.html',
})

@Injectable({
  providedIn: 'root'
})
export class StaffFilterComponent extends Unsubscribable implements OnInit {
  private ss: ShareService;
  values = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    login: '',
    speciality: '',
    active: ''
  };
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');
  login = new FormControl('');
  speciality = new FormControl('');
  active = new FormControl('');

  ngOnInit() {
    this.firstName.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        firstName => {
          this.values.firstName = firstName;
          this.ss.change(this.values);
        }
      );
    this.lastName.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        lastName => {
          this.values.lastName = lastName;
          this.ss.change(this.values);
        }
      );
    this.email.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        email => {
          this.values.email = email;
          this.ss.change(this.values);
        }
      );
    this.phone.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        phone => {
          this.values.phone = phone;
          this.ss.change(this.values);
        }
      );
    this.login.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        login => {
          this.values.login = login;
          this.ss.change(this.values);
        }
      );
    this.speciality.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        speciality => {
          this.values.speciality = speciality;
          this.ss.change(this.values);
        }
      );
    this.active.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        active => {
          this.values.active = active;
          this.ss.change(this.values);
        }
      );
  }


  constructor(ss: ShareService, private formBuilder: FormBuilder) {
    super();
    this.ss = ss;
  }

}
