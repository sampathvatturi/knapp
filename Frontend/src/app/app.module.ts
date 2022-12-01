import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layouts/home/home.component';
import { NgAntdModule } from './shared/ng-antd.module';
import { USER_COMPONENTS } from './layouts/user';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  PB_DIRECTION,
  SPINNER,
} from 'ngx-ui-loader';
import { HeaderComponent } from './layouts/common/header/header.component';
import { TokenInterceptorInterceptor } from './services/auth/token-interceptor.interceptor';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

registerLocaleData(en);

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: 'Loading...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  pbColor: 'blue',
  bgsColor: 'blue',
  fgsColor: 'blue',
  fgsType: SPINNER.rectangleBouncePulseOut,
  fgsSize: 75,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3,
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ...USER_COMPONENTS,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    NgAntdModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    GooglePlaceModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
