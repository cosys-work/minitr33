import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaviComponent } from './navi.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {
    path: "init",
    component: NaviComponent, 
    children: [
      {
        path: "create",
        loadChildren: () => import("../formal-e-t/formal-e-t.module").then(m => m.FormalETModule)
      },
      {
        path: "",
        pathMatch: "full",
        component: WelcomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaviRoutingModule { }
