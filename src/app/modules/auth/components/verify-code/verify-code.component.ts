import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  validateForm!: FormGroup;
  validateError: boolean = false;
  deadline = Date.now() + 1000 * 120;


  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private globalService: EndPointGobalService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
    });

  }


  submitForm(): void {
    if (this.validateForm.valid) {

      this.globalService.Post('verify-code', {code: this.validateForm.value.code}).subscribe(
        (result: any) => {
          //console.log(result);

          if(result.error){
            this.notificationService.createMessage('error', `${result.error}  😓`);

          }else{
            this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
            this.router.navigate(['login/reset-password', result]);

          }

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

