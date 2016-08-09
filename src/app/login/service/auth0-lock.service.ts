import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth0 {
  // Configure Auth0
  YOUR_CLIENT_ID:string  = 'RZuJRpKJZszsRJ19O0LqGJEfyS1BRdf7';
  YOUR_DOMAIN:string     = 'edicon.eu.auth0.com';

  lock = new Auth0Lock( this.YOUR_CLIENT_ID,  this.YOUR_DOMAIN, {});

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('profile', authResult.idToken);
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
}
