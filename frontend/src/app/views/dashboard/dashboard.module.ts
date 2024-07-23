import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DbMainComponent } from './db-main/db-main.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    DbMainComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    DashboardRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
