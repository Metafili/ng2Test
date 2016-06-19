import { Component, OnInit } from '@angular/core';
import { 
  AngularFire, 
  FirebaseObjectObservable, FirebaseListObservable,
  AuthMethods, AuthProviders  } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  
  constructor( public af: AngularFire ) {}

  ngOnInit() {
  }

  anoLogin() {
    // this.af.auth.login();
    // Anonymous
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    })
    .then(_ => console.log("Login: OK"))
    .catch( e => console.log("Login: Failed"));
  }
  
  // Email and password
  emailLogin() {
    /*
    this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
    .then(_ => {
      console.log("Email Login: OK")
      this.af.auth.login({ 
      email: 'hslee.edicon@gmail.com', password: '1234' })
      .then(_ => console.log("Email Login: OK"))
      .catch( e => console.log("Email Login: Failed"));
    })
    .catch( e => console.log("Email Login: Failed"));
    */
    
    this.af.auth.login({ 
      email: 'hslee.edicon@gmail.com', password: '1234' })
      .then(_ => console.log("Email Login: OK"))
      .catch( e => console.log("Email Login: Failed"));
  }
  
  // Twitter
  twittLogin() {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    })
    .then(_ => console.log("Twitter Login: OK"))
    .catch( e => console.log("Twitter Login: Failed"));
  }

}
