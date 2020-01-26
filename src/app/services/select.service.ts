import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  // Observable string sources
  private missionAnnouncedSource = new BehaviorSubject<string>(null);

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();

  // Service message commands
  announceMission(id: string) {
    console.log(id);
    this.missionAnnouncedSource.next(id);
  }
}
