import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  current_date_selected = null;
  reserved_date_list = [
    {date: "2015-10-12 12:15"},
    {date: "2015-10-12 13:55"},
    {date: "2015-10-12 16:35"},
    {date: "2015-10-12 17:25"},
    {date: "2015-10-13 14:55"},
    {date: "2015-10-13 08:25"},
    ];

  constructor() { }

  sendReservation(reservation, date_parsed){
    console.log(reservation.name, reservation.surname, reservation.phone, reservation.email, date_parsed);
  }

  getDateList(){
    if (this.current_date_selected == null) {
      return null
    }
    else {
      return this.reserved_date_list;
    }
  }
}
