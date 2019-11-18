import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';

export class Unsubscribable implements OnDestroy {
  destroy$ = new Subject();


  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
