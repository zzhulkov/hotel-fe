import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

export class Unsubsribable implements OnDestroy{
  destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
