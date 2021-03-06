import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccueilComponent } from './accueil/accueil.component';
import { AppointmentComponent } from './appointment/appointment.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { RgpdComponent } from './rgpd/rgpd.component';
import { ContactComponent } from './contact/contact.component';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: '404', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'accueil', component: AccueilComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'rgpd', component: RgpdComponent},
  {path: 'contact', component: ContactComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    AppointmentComponent,
    RgpdComponent,
    ContactComponent,
  ],
    imports: [
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        RouterModule.forRoot(routes),
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatListModule,
        MatIconModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
    ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
