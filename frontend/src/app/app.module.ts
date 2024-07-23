import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {LayoutAuthComponent} from './shared/layout-auth/layout-auth.component';
import {MainComponent} from './views/main/main.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {LayoutDashboardComponent} from './shared/layout-dashboard/layout-dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./core/token.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-owl-carousel-o";
import {RouterModule} from "@angular/router";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { ConstructorComponent } from './views/main/constructor/constructor.component';


import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import { CountSelectorComponent } from './shared/components/count-selector/count-selector.component'
registerLocaleData(localeRu)


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LayoutAuthComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LayoutDashboardComponent,
    ConstructorComponent,
    CountSelectorComponent,


  ],
  imports: [
    RouterModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },

    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: LOCALE_ID,useValue: 'ru'}

  ],


  bootstrap: [AppComponent]
})
export class AppModule {
}
