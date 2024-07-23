import {LOCALE_ID, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoryComponent } from './category/category.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { PositionsComponent } from './positions/positions.component';
import { CreatePositionComponent } from './positions/create-position/create-position.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import { PastaComponent } from './pasta/pasta.component';
import { CreatePastaComponent } from './pasta/create-pasta/create-pasta.component';
import {CartComponent} from "../../shared/components/cart/cart.component";


import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru'
registerLocaleData(localeRu)

@NgModule({
  declarations: [
    CategoryComponent,
    CreateCategoryComponent,
    PositionsComponent,
    CreatePositionComponent,
    PastaComponent,
    CreatePastaComponent,
    CartComponent

  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTooltipModule,
        ReactiveFormsModule,
        FormsModule,

    ],
  providers:[
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue:{duration: 2500}},
    {provide: LOCALE_ID,useValue: 'ru'}
  ]
})
export class PagesModule { }
