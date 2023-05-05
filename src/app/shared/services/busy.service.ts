import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  counter = 0
  constructor(private spinner: NgxSpinnerService) { }

  busy() {
    this.counter++;
    this.spinner.show();
  }
  idle() {
    this.counter--;
    if (this.counter <= 0) {
      this.counter = 0;
      this.spinner.hide();
    }
  }
}
