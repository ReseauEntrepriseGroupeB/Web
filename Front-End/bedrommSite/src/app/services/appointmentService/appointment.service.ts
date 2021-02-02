import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  putReservationURL : 'localhost/register';
  getDateURL: 'localhost/:';

  current_date_selected = null;
  reserved_date_list = null;

  constructor(private http: HttpClient) { }

  sendReservation(reservation, date_parsed){
    console.log(reservation.name, reservation.surname, reservation.phone, reservation.email, date_parsed);
    return this.http.put(this.putReservationURL ,{
      "nom": reservation.name,
      "prenom":reservation.prenom,
      "telephone": reservation.phone,
      "email": reservation.email,
      "dateRDV" : date_parsed
    });
  }

  getDateList(daterequested : string){
    this.current_date_selected = daterequested;
    if (this.current_date_selected == null) {
      return null
    }
    else {
      this.reserved_date_list = this.http.get(this.getDateURL + this.current_date_selected);
      return this.reserved_date_list;
    }
  }
}
