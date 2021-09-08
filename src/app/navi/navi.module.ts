import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NaviRoutingModule } from './navi-routing.module';
import { NaviComponent } from './navi.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    NaviComponent,
    WelcomeComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    NaviRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    NaviComponent
  ]
})
export class NaviModule { }
