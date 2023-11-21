import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreTrafficLightsBigSurComponent } from './components/login/core-traffic-lights-big-sur/core-traffic-lights-big-sur.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AppComponent, CoreTrafficLightsBigSurComponent, LoginComponent, DashboardComponent],
  imports: [BrowserModule, RouterModule, AppRoutingModule,FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true}

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
