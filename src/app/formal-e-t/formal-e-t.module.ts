import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { SharedModule } from '../shared/shared.module';
import { DashCellComponent } from './dash-grid/dash-cell/dash-cell.component';
import { DashContentComponent } from './dash-grid/dash-cell/core/dash-content/dash-content.component';
import { DashLogicComponent } from './dash-grid/dash-cell/core/dash-logic/dash-logic.component';
import { DashOverviewComponent } from './dash-grid/dash-cell/view/dash-overview/dash-overview.component';
import { DashPreviewComponent } from './dash-grid/dash-cell/view/dash-preview/dash-preview.component';
import { DashGridComponent } from './dash-grid/dash-grid.component';
import { FlexLayoutType } from './flex-layouting.component';
import { FormEtaComponent } from './form-eta/form-eta.component';
import { FormalETRoutingModule } from './formal-e-t-routing.module';
import { GraForceComponent } from './gra-force/gra-force.component';
import { FormlyMatCheckboxModule } from '@ngx-formly/material/checkbox';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlyMatInputModule } from '@ngx-formly/material/input';
import { FormlyMatMultiCheckboxModule } from '@ngx-formly/material/multicheckbox';
import { FormlyMatRadioModule } from '@ngx-formly/material/radio';
import { FormlyMatSelectModule } from '@ngx-formly/material/select';
import { FormlyMatTextAreaModule } from '@ngx-formly/material/textarea';
import { FormlyAutocompleteComponent } from './form-fields/formly-autocomplete/formly-autocomplete.component';



const COMPS = [
  FormEtaComponent,
  DashGridComponent,
  DashCellComponent,
  DashOverviewComponent,
  DashContentComponent,
  DashLogicComponent,
  DashPreviewComponent,
  GraForceComponent,
  FlexLayoutType,
  FormlyAutocompleteComponent
];

@NgModule({
  declarations: [
    ...COMPS,
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
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatCommonModule,
    MatAutocompleteModule,
    SharedModule,
    FlexLayoutModule,
    FormlyModule.forChild({ 
      extras: { 
        lazyRender: true 
      },
      types: [{
        name: 'autocomplete',
        component: FormlyAutocompleteComponent,
        wrappers: ['form-field'],
      }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMatCheckboxModule,
    FormlyMatFormFieldModule,
    FormlyMatInputModule,
    FormlyMatMultiCheckboxModule,
    FormlyMatRadioModule,
    FormlyMatSelectModule,
    FormlyMatTextAreaModule
  ],
  exports: [
    ...COMPS
  ]
})
export class FormalETModule { }
