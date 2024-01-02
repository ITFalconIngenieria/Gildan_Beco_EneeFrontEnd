import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuLayoutComponent } from './components/menu-layout/menu-layout.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { NzFormModule } from 'ng-zorro-antd/form';

//import graphics module
import { CommonModule } from '@angular/common';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';



@NgModule({
  declarations: [
    MenuLayoutComponent,

  ],
  imports: [
    RouterModule,
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzGridModule,
    NzModalModule,
    NzRadioModule,
    NzSpinModule,
    FusionChartsModule,
    NzAlertModule,
    NzBackTopModule,
    NzMessageModule,
    NzNotificationModule,
    NzStatisticModule,
    NzAvatarModule
  ],
  exports: [
    MenuLayoutComponent,
    NzFormModule,
  ]
})
export class SharedModule { }
