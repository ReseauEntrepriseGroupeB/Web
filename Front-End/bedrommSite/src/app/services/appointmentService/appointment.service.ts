import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }

  getDateList(Date){
    return this.dateList;
  }
}
