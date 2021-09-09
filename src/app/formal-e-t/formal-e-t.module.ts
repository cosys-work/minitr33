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
import { DashCellComponent } from './dash-grid/dash-cell/dash-cell.component';
import { DashOverviewComponent } from './dash-grid/dash-cell/dash-overview/dash-overview.component';
import { DashContentComponent } from './dash-grid/dash-cell/dash-content/dash-content.component';
import { DashLogicComponent } from './dash-grid/dash-cell/dash-logic/dash-logic.component';
import { DashPreviewComponent } from './dash-grid/dash-cell/dash-preview/dash-preview.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { GraForceComponent } from './gra-force/gra-force.component';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormlyModule } from '@ngx-formly/core';
import { FlexLayoutModule } from '@angular/flex-layout';

const COMPS = [
  FormEtaComponent,
  DashGridComponent,
  DashCellComponent,
  DashOverviewComponent,
  DashContentComponent,
  DashLogicComponent,
  DashPreviewComponent,
  GraForceComponent
]

@NgModule({
  declarations: [
    ...COMPS
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
    LayoutModule,
    NgxGraphModule,
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FlexLayoutModule, 
    FormlyModule.forChild(),
  ],
  exports: [
    ...COMPS
  ]
})
export class FormalETModule { }
