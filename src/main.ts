import { bootstrap }      from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { Http, HTTP_PROVIDERS  } from '@angular/http';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {MdGestureConfig} from '@angular2-material/core/gestures/MdGestureConfig';
// New Forms API
import { disableDeprecatedForms, provideForms } from '@angular/forms';
// Modal: https://github.com/shlomiassaf/angular2-modal/blob/master/QUICKTHROUGH.md
// https://github.com/lsiden/angular2-modal/commit/a6b047a61673364e077a3447d96d5bfb58b4cbaf
import {MODAL_BROWSER_PROVIDERS} from "angular2-modal/platform-browser/index";

import { Ng2TestAppComponent, environment } from './app/';
import {
  FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2'

// JWT
import { AuthConfig, AuthHttp } from 'angular2-jwt';

if (environment.production) {
  enableProdMode();
}

bootstrap(Ng2TestAppComponent, [
  MODAL_BROWSER_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  HTTP_PROVIDERS,
  provide(HAMMER_GESTURE_CONFIG, {useClass: MdGestureConfig}),
  FIREBASE_PROVIDERS,
  // defaultFirebase('https://vivid-torch-3052.firebaseio.com/'),
  defaultFirebase({
    apiKey: "AIzaSyCT1e0MDRmnD_9juAp7VMWCLnJDiTJu7JY",
    authDomain: "vivid-torch-3052.firebaseapp.com",
    databaseURL: "https://vivid-torch-3052.firebaseio.com/",
    storageBucket: "vivid-torch-3052.appspot.com",
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password
    // provider: AuthProviders.Google,
    // method: AuthMethods.Redirect
  }),
  provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          tokenName: 'jwt'
        }), http);
      },
      deps: [Http]
  })
]);
