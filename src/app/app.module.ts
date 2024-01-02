import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { registerLocaleData, CommonModule, DatePipe } from '@angular/common';
import localeEsMX from '@angular/common/locales/ff-Latn-CM';

registerLocaleData(localeEsMX, 'es-MX');
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "@shared/shared.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@shared/helpers/jwt.interceptor';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    NzEmptyModule

  ],

  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: LOCALE_ID, useValue: 'en_US' },
    { provide: HTTP_INTERCEPTORS ,useClass: JwtInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
