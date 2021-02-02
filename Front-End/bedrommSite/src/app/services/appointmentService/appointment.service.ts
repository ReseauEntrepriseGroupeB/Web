import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  current_date_selected = null;
  reserved_date_list = null;

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
