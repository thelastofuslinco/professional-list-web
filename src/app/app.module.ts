import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RecordComponent } from './pages/record/record.component';
import { RecordsComponent } from './pages/records/records.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputMaskModule } from 'primeng/inputmask';
import { ValidateComponent } from './pages/validate/validate.component';
import { HeadersInterceptors } from './interceptors/headersInterceptors';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
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
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RecordComponent,
    RecordsComponent,
    ValidateComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptors, multi: true },
  ],
})
export class AppModule {}
