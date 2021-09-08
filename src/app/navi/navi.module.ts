import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NaviRoutingModule } from './navi-routing.module';
import { NaviComponent } from './navi.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    NaviComponent
  ],
  imports: [
    CommonModule,
    NaviRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    NaviComponent
  ]
})
export class NaviModule { }
