import {Component, Output, EventEmitter, Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ShareService {

  @Output() share: EventEmitter<any> = new EventEmitter();

  change(item: any) {
    console.log('selected item ' + item);
    this.share.emit(item);
  }

  getEmittedValue() {
    return this.share;
  }
}
