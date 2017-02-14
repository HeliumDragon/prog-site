import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CardDetailsComponent } from './card/card-details/card-details.component';

const APP_ROUTES: Routes = [
  { path: 'users/:userName', component: CardDetailsComponent},
  { path: '', component: HomeComponent }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
