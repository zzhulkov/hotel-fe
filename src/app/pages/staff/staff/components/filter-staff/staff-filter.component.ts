import {Component, Injectable, OnInit} from '@angular/core';
import {Unsubscribable} from '../../../../../component/Unsubscribable';
import {ShareService} from '../../../../../services/share.service';
import {FormControl, FormGroup} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {ConstantsService} from '../../../../../services/constants.service';


const URL = new ConstantsService().BASE_URL;

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

  private shareService: ShareService;

  staffFilterForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    login: new FormControl(''),
    speciality: new FormControl(''),
    active: new FormControl('')
  });

  ngOnInit() {
    this.staffFilterForm.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(
        staffFilterForm => {
          this.staffFilterForm = staffFilterForm;
          this.shareService.setEmittedValue(this.staffFilterForm);
        }
      );
  }


  constructor(shareService: ShareService) {
    super();
    this.shareService = shareService;
  }

}
