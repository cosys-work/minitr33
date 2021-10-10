import { NgModule } from '@angular/core';
import { StatefulnessComponent } from './statefulness/statefulness.component';

const COMPS = [
  StatefulnessComponent
];

@NgModule({
  declarations: [
    ...COMPS
  ],
  imports: [],
  exports: [
    ...COMPS
  ]
})
export class SharedModule { }
