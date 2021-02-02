import { Component, OnInit } from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // pas le mardi et dimanche
    return day !== 1 && day !== 6;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
