import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormalETRoutingModule } from './formal-e-t-routing.module';
import { FormEtaComponent } from './form-eta/form-eta.component';
import { DashGridComponent } from './dash-grid/dash-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    FormEtaComponent,
    DashGridComponent
  ],
  imports: [
    CommonModule,
    FormalETRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    LayoutModule
  ]
})
export class FormalETModule { }
