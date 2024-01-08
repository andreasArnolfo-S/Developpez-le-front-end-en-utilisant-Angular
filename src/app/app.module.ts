import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DetailChartComponent } from './components/detail-chart/detail-chart.component';
import { HomeChartComponent } from './components/home-chart/home-chart.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailComponent, DetailChartComponent, HomeChartComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
