import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

import { UserService } from './user.service';
import { DialogComponent } from './dialog/dialog.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';

import { routing } from './app.routing';
import { CardDetailsComponent } from './card/card-details/card-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    DialogComponent,
    CardComponent,
    HomeComponent,
    CardDetailsComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [{provide: 'user', useClass: UserService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
