import { bootstrap }      from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS  } from '@angular/http';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {MdGestureConfig} from '@angular2-material/core/gestures/MdGestureConfig';
import { Ng2TestAppComponent, environment } from './app/';
import {
  FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthMethods,
  AuthProviders,
  firebaseAuthConfig} from 'angularfire2'

if (environment.production) {
  enableProdMode();
}

bootstrap(Ng2TestAppComponent, [
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
  })
]);
