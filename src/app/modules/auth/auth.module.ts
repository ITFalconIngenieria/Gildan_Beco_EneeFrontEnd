import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthMainComponent } from './pages/auth-main/auth-main.component';
import {LoginPageComponent} from "./components/login-page/login-page.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
// ng-zorro

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from "../../shared/shared.module";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

//shared

import { RegisterComponent } from './components/register/register.component';
import { GenereteCodeComponent } from './components/generete-code/generete-code.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AuthMainComponent,
    LoginPageComponent,
    RegisterComponent,
    GenereteCodeComponent,
    VerifyCodeComponent,
    ResetPasswordComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    // ng-zorro
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzGridModule,
    NzTableModule,
    NzDropDownModule,
    NzModalModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzRadioModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzDrawerModule,
    HttpClientModule,
    NzNotificationModule,
    NzStatisticModule,
    NzAvatarModule,
    //shared
    SharedModule,
  ],
  providers:
    [CookieService],
})
export class AuthModule { }
