import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryComponent} from "./category/category.component";
import {CreateCategoryComponent} from "./category/create-category/create-category.component";
import {PositionsComponent} from "./positions/positions.component";
import {CreatePositionComponent} from "./positions/create-position/create-position.component";
import {PastaComponent} from "./pasta/pasta.component";
import {CreatePastaComponent} from "./pasta/create-pasta/create-pasta.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/category', pathMatch: 'full'},
  {path:'category',component:CategoryComponent},
  {path:'category/create',component:CreateCategoryComponent},
  {path:'category/edit',component:CreateCategoryComponent},
  {path:'category/positions',component:CreateCategoryComponent},
  {path:'position',component:PositionsComponent},
  {path:'position/create',component:CreatePositionComponent},
  {path:'position/edit',component:CreatePositionComponent},
  {path:'pasta',component:PastaComponent},
  {path:'pasta/create',component:CreatePastaComponent},
  {path:'sauce',component:PastaComponent},
  {path:'sauce/create',component:CreatePastaComponent},
  {path:'extra',component:PastaComponent},
  {path:'extra/create',component:CreatePastaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
