import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data: any;
  @Output() share: EventEmitter<any> = new EventEmitter();

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    if (this.data == null) {
      return null;
    }
    return this.data;
  }
}
