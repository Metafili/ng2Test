import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { NewDemoAppComponent, environment } from './app/';
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

bootstrap(NewDemoAppComponent, [
  FIREBASE_PROVIDERS, 
  defaultFirebase('https://vivid-torch-3052.firebaseio.com/'),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
    // provider: AuthProviders.Google,
    // method: AuthMethods.Redirect
  })
]);
