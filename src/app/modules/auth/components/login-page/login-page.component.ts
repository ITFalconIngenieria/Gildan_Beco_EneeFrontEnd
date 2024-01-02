import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import { key } from 'src/Core/Libraries/keys/keys.library';
import {Router} from "@angular/router";
import { NotificationService } from '@shared/services/notification.service';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  validateForm!: FormGroup;
  validateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private notification: NotificationService,
    private globalService: EndPointGobalService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      identificator: [null, [Validators.required]],
      password: [null, [Validators.required]],
      //remember: [true]
    });

  }


  submitForm(): void {
    if (this.validateForm.valid) {
      //console.log(this.validateForm.value);
      this.cookieService.deleteAll();
      const res : any = this.globalService.Post( 'login', this.validateForm.value).subscribe(
        (result:any) => {

          if(result?.token){
            //console.log(result.token);
            this.validateError = false;
            this.cookieService.set("tokensession", result?.token +'' , key.TOKEN_EXPIRATION_TIME, '');
            localStorage.setItem('user', result?.usuario);
            localStorage.setItem('rol', result?.rol);
            this.router.navigate(['sys/welcome'])
            //console.log('Soy el token activo: ' + this.cookieService.get('tokensession'));
            this.notification.createNotification('success', 'Exito','Sesion iniciada con exito 😄');


          }
          else{
            //console.log(result);

            this.validateError = true;
            this.notification.createNotification('error', 'Falló', `${result.content} 😓`);
          }

          return result;
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
