import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReportsComponent } from './components/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children:
     [
      {
        path: 'welcome',
        component: HomeComponent
      },

      {
        path: 'reports',
        component: ReportsComponent
      },

     ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuLayoutRoutingModule { }
