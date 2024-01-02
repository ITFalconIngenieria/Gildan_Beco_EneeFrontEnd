import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndPointGobalService } from '@shared/services/end-point-gobal.service';
import { NotificationService } from '@shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-generete-code',
  templateUrl: './generete-code.component.html',
  styleUrls: ['./generete-code.component.css']
})
export class GenereteCodeComponent implements OnInit {
  validateForm!: FormGroup;
  validateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private globalService: EndPointGobalService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      identificator: [null, [Validators.required]],
    });
        
  }

  
  submitForm(): void {
    if (this.validateForm.valid) { 
      // console.log('entre');
      
      this.globalService.Post('send-email', {
        identificator: this.validateForm.value.identificator, 
        subject: 'Codigo de verificación',
        text: 'Su codigo de verificacion es : ',
        option: 1
      
      }).subscribe(
        (result: any) => {
          //console.log(result);
          
          if(result.error){
            this.notificationService.createMessage('error', `${result.error}  😓`);

          }else{
            this.notificationService.createMessage('success', 'La acción se ejecuto con exito 😎');
            this.router.navigate(['/login/verify-code']);
            
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
