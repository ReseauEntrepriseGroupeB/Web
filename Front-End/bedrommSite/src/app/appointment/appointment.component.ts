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
  matcher = new MyErrorStateMatcher();

  date_selected = false;
  reserved_date_list = [];
  date_list = [
    {
    hour: "8:30",
    empty: false,
  },
    {
      hour: "9:00",
      empty: true,
    },
    {
      hour: "9:30",
      empty: true,
    },
    {
      hour: "9:00",
      empty: true,
    },
    {
      hour: "9:30",
      empty: true,
    },
    {
      hour: "10:00",
      empty: true,
    },
    {
      hour: "10:30",
      empty: true,
    },
    {
      hour: "11:00",
      empty: true,
    },
    {
      hour: "11:30",
      empty: true,
    },
    {
      hour: "12:00",
      empty: true,
    },
    {
      hour: "13:30",
      empty: true,
    },
    {
      hour: "14:00",
      empty: true,
    },
    {
      hour: "14:30",
      empty: true,
    },
    {
      hour: "15:00",
      empty: true,
    },
    {
      hour: "15:30",
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
    this.reserved_date_list = this.appointmentService.getDateList();
  }

  /**
   * réservation de l'heure souhiatée
   * @param date
   */
  bookHour(date) {
    console.log(date);
  }
}
