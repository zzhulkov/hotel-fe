import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  // Observable string sources
  private selectAnnouncedSource = new BehaviorSubject<any>(null);

  // Observable string streams
  selectAnnounced$ = this.selectAnnouncedSource.asObservable();

  // Service message commands
  announceSelect(row: any) {
    console.log(row);
    this.selectAnnouncedSource.next(row);
  }
}
