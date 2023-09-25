import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RecordComponent } from './pages/record/record.component';
import { RecordsComponent } from './pages/records/records.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { ValidateComponent } from './pages/validate/validate.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InputMaskModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RecordComponent,
    RecordsComponent,
    ValidateComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
