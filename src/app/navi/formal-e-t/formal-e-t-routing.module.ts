import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashGridComponent } from './dash-grid/dash-grid.component';
import { FormEtaComponent } from './form-eta/form-eta.component';

const routes: Routes = [
  {
    path: "eta",
    component: FormEtaComponent
  },
  {
    path: "",
    pathMatch: "full",
    component: DashGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormalETRoutingModule { }
