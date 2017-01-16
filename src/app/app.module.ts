import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

import { ForecastService } from './forecast.service';
import { DialogComponent } from './dialog/dialog.component';
import { CardComponent } from './card/card.component';
import { OneDayComponent } from './one-day/one-day.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    DialogComponent,
    CardComponent,
    OneDayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: 'forecast', useClass: ForecastService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
