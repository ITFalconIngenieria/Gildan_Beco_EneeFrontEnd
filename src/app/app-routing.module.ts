import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren:() => import('@modules/auth/auth.module').then((m) => m.AuthModule),

  },
  { 
    path: 'sys', 
    loadChildren: () => import('@modules/menu-layout/menu-layout.module').then(m => m.MenuLayoutModule),
    canActivate: [AuthGuard] 
  },
  { path: '', 
    pathMatch: 'full', 
    redirectTo: '/sys/welcome' 
  },
  { path: '**', 
    pathMatch: 'full', 
    redirectTo: '/sys/welcome' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
