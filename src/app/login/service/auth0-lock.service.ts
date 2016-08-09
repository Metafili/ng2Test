import { Injectable }      from '@angular/core';

import { tokenNotExpired,  } from 'angular2-jwt';
// import { Auth0Lock }       from 'auth0-lock'; // Not Yet

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth0LockService {
  // Auth0: Dashboard:Clients:Default App
  // Tutorial: https://auth0.com/docs/quickstart/spa/angular2
  // ***Restrict: https://auth0.com/docs/quickstart/spa/angular2/07-authorization
  //    https://toddmotto.com/angular-2-authentication

  YOUR_CLIENT_ID:string  = 'RZuJRpKJZszsRJ19O0LqGJEfyS1BRdf7';
  YOUR_DOMAIN:string     = 'edicon.eu.auth0.com';

  userProfile: Object;

  lock = new Auth0Lock( this.YOUR_CLIENT_ID,  this.YOUR_DOMAIN, {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

       // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log("Auth0: " + error );
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };
}
