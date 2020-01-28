import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {SelectService} from "../services/select.service";

export class Unsubscribable implements OnDestroy {
  destroy$ = new Subject();
  constructor(public selectService: SelectService) {
  }


  ngOnDestroy(): void {
    this.selectService.announceSelect(null);
    this.destroy$.next();
  }
}
