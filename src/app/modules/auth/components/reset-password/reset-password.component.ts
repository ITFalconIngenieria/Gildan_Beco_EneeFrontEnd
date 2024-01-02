import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Valide } from 'src/app/validators/validators.custom';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  validateForm!: FormGroup;
  validateError: boolean = false;
  deadline = Date.now() + 1000 * 120;
  customValidators: Valide = new Valide;


  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private globalService: EndPointGobalService,
    private _router: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required]],
    },
    {
      validators: this.customValidators.passwordMatch
    });

  }


  submitForm(): void {
    if (this.validateForm.valid) {

      this.globalService.Post('reset-password', {identificator: Number(this._router.snapshot.paramMap.get('id')), newPassword: this.validateForm.value.password}).subscribe(
        (result: any) => {
          //console.log(result);

          if(result.error){
            this.notificationService.createMessage('error', `${result.error}  😓`);

          }else{
            this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
            this.router.navigate(['/login']);

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
