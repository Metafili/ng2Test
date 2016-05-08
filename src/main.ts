import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NewDemoAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(NewDemoAppComponent);
