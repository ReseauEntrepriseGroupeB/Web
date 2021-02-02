import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {AppointmentService} from "../services/appointmentService/appointment.service";

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

  date_list = [];

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // pas le mardi et dimanche
    return day !== 1 && day !== 6;
  }

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.date_list = this.appointmentService.getDateList(Date);
  }

}
