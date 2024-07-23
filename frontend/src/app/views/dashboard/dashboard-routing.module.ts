import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DbMainComponent} from "./db-main/db-main.component";

const routes: Routes = [
  {path:'dashboard', component:DbMainComponent, children:[
      {path: '',loadChildren:() => import('../../views/pages/pages.module').then(m => m.PagesModule)}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
