import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  putReservationURL: 'localhost/register';
  getDateURL: 'localhost/:';

  current_date_selected = null;
  reserved_date_list = null;

  constructor(private http: HttpClient) {
  }

  sendReservation(reservation): Observable<HttpResponse<any>> {
    return this.http.post<any>('/api/v1/register', reservation, {observe: 'response'});
  }

  getDateList(daterequested: string): Observable<HttpResponse<any>> {
    return this.http.get<any>('/api/v1/rdv/' + daterequested,
      {observe: 'response'});
  }
}
