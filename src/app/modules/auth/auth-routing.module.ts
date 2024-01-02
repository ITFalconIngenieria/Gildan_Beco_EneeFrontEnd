import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenereteCodeComponent } from './components/generete-code/generete-code.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { AuthMainComponent } from './pages/auth-main/auth-main.component';

const routes: Routes = [
  {
    path: '',
    component: AuthMainComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'generate-code',
    component: GenereteCodeComponent,
  },
  {
    path: 'verify-code',
    component: VerifyCodeComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
