import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private mailApi = 'https://mailthis.to/needhelp';

  constructor( private http: HttpClient) { }

  PostMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' })
      .pipe(
        map(
          (response) => {
            if (response) {
              return response;
            }
          },
          (error: any) => {
            return error;
          }
        )
      );
  }

}
