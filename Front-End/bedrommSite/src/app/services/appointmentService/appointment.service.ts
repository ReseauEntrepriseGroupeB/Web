import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  date_list = [
    {date: "2015-10-12 12:15"},
    {date: "2015-10-12 13:55"},
    {date: "2015-10-12 16:35"},
    {date: "2015-10-12 17:25"},
    {date: "2015-10-13 14:55"},
    {date: "2015-10-13 08:25"},
    ];

  constructor() { }

  getDateList(Date){
    return this.date_list;
  }
}
