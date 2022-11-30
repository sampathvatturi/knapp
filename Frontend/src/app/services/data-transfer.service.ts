import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  store: any;
  constructor() {}

  setData( value: any) {
   this.store = value;
  }

  getData() {
    let value = this.store;
    this.store = '';
    return value;
  }
}
