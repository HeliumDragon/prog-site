import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

/// <reference path="../typings/globals/service_worker_api/index.d.ts" />

//if (environment.production) {
  enableProdMode();
//}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/prog-site/service-worker.js')
           .then(function() { console.log('Service Worker Registered');
         });
}

platformBrowserDynamic().bootstrapModule(AppModule);
