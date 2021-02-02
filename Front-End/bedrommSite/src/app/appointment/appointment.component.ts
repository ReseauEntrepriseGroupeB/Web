import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AppointmentService} from "../services/appointmentService/appointment.service";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  PhoneFormControl = new FormControl('', [
    Validators.required,
  ]);
  NameFormControl = new FormControl('', [
    Validators.required,
  ]);
  SurnameFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  name: any;
  surname: any;
  phone: any;
  email: any;

  date_selected = false;
  reserved_date_list = [];
  requested_date_parsed = null;
  reservation = null
  selected_date: any;
  date_list = [
    {
    hour: 8,
    empty: true,
  },
    {
      hour: 9,
      empty: true,
    },
    {
      hour: 10,
      empty: true,
    },
    {
      hour: 11,
      empty: true,
    },
    {
      hour: 12,
      empty: true,
    },
    {
      hour: 13,
      empty: true,
    },
    {
      hour: 14,
      empty: true,
    },
    {
      hour: 15,
      empty: true,
    },
    {
      hour: 16,
      empty: true,
    },
    {
      hour: 17,
      empty: true,
    },
    {
      hour: 18,
      empty: true,
    },
  ];

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // pas le mardi et dimanche
    return day !== 1 && day !== 6;
  }

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  /**
   * récupération de la liste des heures disponibles sur base de la date choisie
   * @param type
   * @param event
   */
  select_date(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.date_selected = true;
    this.selected_date = event.value;
    let year = this.selected_date.getFullYear().toString();
    let month = (this.selected_date.getMonth() + 1).toString();
    let day = this.selected_date.getDate().toString();
    let daterequested =  year +'-'+ month +'-' + day
    this.reserved_date_list = this.appointmentService.getDateList(daterequested);
    if (this.reserved_date_list != null){
      for (let reserved of this.reserved_date_list){
        for (let date of this.date_list){
          if (date == reserved) {
            
          }
        }
      }
    }
  }

  /**
   * réservation de l'heure souhiatée
   * @param date
   */
  bookHour(date) {

    if (this.name == null|| this.surname == null || this.email == null || this.phone == null) {
      console.log("veuillez remplir tout les champs");
    }
    else {
      let hour = date.hour;
      let year = this.selected_date.getFullYear().toString();
      let month = (this.selected_date.getMonth() + 1).toString();
      let day = this.selected_date.getDate().toString();
      this.reservation = {
        name: this.name,
        surname: this.surname,
        phone: '+32' + this.phone,
        email: this.email,
        date: day + '/' + month + '/' + year + " " + hour + ":" + '00',
      }
      this.requested_date_parsed = year +'-'+  month +'-'+ day +'T'+ hour +':' + '00:00.000';
    }
  }

  /**
   * send réservation to the DB
   * @param date
   */
  sendReservation(){
    if (this.name == null|| this.surname == null || this.email == null || this.phone == null) {
      console.log("veuillez remplir tout les champs");
    }
    else {
      this.appointmentService.sendReservation(this.reservation, this.requested_date_parsed);
    }
  }
}
