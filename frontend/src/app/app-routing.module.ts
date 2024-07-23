import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutAuthComponent} from "./shared/layout-auth/layout-auth.component";
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {LayoutDashboardComponent} from "./shared/layout-dashboard/layout-dashboard.component";
import {AuthGuard} from "./core/auth.guard";
import {ConstructorComponent} from "./views/main/constructor/constructor.component";

const routes: Routes = [

  {path:'',component:LayoutComponent, children:[
      {path: '',component:MainComponent},
      {path: 'constructor',component:MainComponent},
    ]},

  {path:'',component:LayoutAuthComponent, children: [
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)},
    ]},

  {path:'', component: LayoutDashboardComponent,canActivate:[AuthGuard], children:[
      {path: '', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)},
    ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
