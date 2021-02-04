import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AppointmentService} from '../services/appointmentService/appointment.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

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
  date_reservation: any;
  date_selected = false;
  date_event = null;
  reserved_date_list = [];
  requested_date_parsed = null;
  reservation = null;
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

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
  }

  /**
   * récupération de la liste des heures disponibles sur base de la date choisie
   * @param type
   * @param event
   */
  select_date(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date_event = event;
    this.date_list = [
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
    this.date_selected = true;
    this.selected_date = event.value;
    const year = this.selected_date.getFullYear().toString();
    const month = (this.selected_date.getMonth() + 1).toString();
    const day = this.selected_date.getDate().toString();
    const daterequested: string = year + '-' + month + '-' + day;
    this.appointmentService.getDateList(daterequested)
      .subscribe((data: any) => {
          this.reserved_date_list = data.body.rdv;
          if (this.reserved_date_list != null) {
            for (const reserved of this.reserved_date_list) {
              for (const date of this.date_list) {
                if (date.hour == reserved) {
                  date.empty = false;
                }
              }
            }
          }
        }, error => {
          console.log(error);
        }
      );

  }

  /**
   * réservation de l'heure souhaitée
   * @param date
   */
  bookHour(date) {
    if (this.name == null || this.surname == null || this.email == null || this.phone == null) {
      console.log('veuillez remplir tout les champs');
    } else {
      const hour = date.hour;
      const year = this.selected_date.getFullYear();
      const month = (this.selected_date.getMonth() + 1);
      const day = this.selected_date.getDate();

      this.date_reservation = "Le " + day + "/" + month + "/" + year + " à " + hour + " heure";

      this.requested_date_parsed = new Date(this.selected_date);
      this.requested_date_parsed.setUTCHours(hour, 0, 0);
      this.requested_date_parsed.setUTCDate(day);
      this.requested_date_parsed.setUTCMonth(month - 1);

      this.reservation = {
        nom: this.name,
        prenom: this.surname,
        telephone: '+32' + this.phone,
        email: this.email,
        dateRDV: new Date(this.requested_date_parsed).toISOString()
      };
      console.log(this.reservation);
    }
  }

  /**
   * send réservation to the DB
   * @param date
   */
  sendReservation() {
    if (this.name == null || this.surname == null || this.email == null || this.phone == null) {
      console.log('veuillez remplir tout les champs');
    } else {
      // console.log(this.reservation);
      this.appointmentService
        .sendReservation(this.reservation)
        .subscribe(
          (response: any) =>
          this.select_date('change', this.date_event),
          error =>
            console.log(error));
      location.reload()
    }
  }
}
