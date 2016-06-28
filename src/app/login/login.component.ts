import { Component, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  AuthMethods, AuthProviders  } from 'angularfire2';
import {MdButton} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [
    MdIconRegistry
  ],
  directives: [
    MD_INPUT_DIRECTIVES,
    MdButton,
    MdIcon,
  ]
})
export class LoginComponent implements OnInit {
  title = 'Login';e
  private emailId: string;
  private password: string;
  private focused: boolean;
  private custToken: any;

  constructor( public af: AngularFire ) {
    this.af.auth.subscribe(auth => { console.log(auth); });
  }

  ngOnInit() {
  }

  getEmail( email: string ) {
    this.emailId = email;
    this.focused = true;
    console.log("email: " + email );
  }

  getPass( pass: string ) {
    this.password = pass;
    console.log("pass: " + pass );
    // this.emailLogin();
  }

  // Anonymous
  anoLogin() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    }).then(_ => console.log("Guest Login: OK"))
      .catch( e => console.log("Guest Login: Failed: " + e ));
  }

  // Email and password
  emailLogin() {
    this.af.auth.login({
      // email: 'hslee.edicon@gmail.com', password: '1234'
      email: this.emailId, password: this.password
    }).then( _ => console.log("Email Login: OK"))
      .catch( e => console.log("Email Login: Failed: " + e ));
  }


  // Twitter: Debugging할려면 Popup으로 설정하여 별도의창
  // Twitter: https://apps.twitter.com/ Login
  //  1. Details: App Name --> Description --> Website(with http)
  //  2. Twitter: Setting: Callback URL <-- Firebase: Callback 주소 복사
  // Firebase:
  //  1. API Key: Twitter App API Key 복사
  //  2. API Secret: Consumer Key API: Twitter
  twittLogin() {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    }).then( _ => console.log("Twitter Login: OK"))
      .catch( e => console.log("Twitter Login: Failed: " + e ));
  }

  // Facebook: https://developers.facebook.com/
  //  1. RightTop: 검색옆 --> 내앱 --> 새앱추가
  //  2. 앱 ID --> 앱시크릿코드 --> Firebas: API Key/Secret에 복사
  //  3. 제품추가 --> Facebook Login 추가 --> Client OAuth 설정 --> Redirection URL --> 저장
  fbLogin() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup // Redirect: Debugging할려면 Popup으로 설정하여 별도의창
    })
    .then( _ => console.log("FB Login: OK"))
    .catch( e => console.log("FB Login: Failed: " + e ));
  }

  // Google: 자동설정됨
  googleLogin() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup // Redirect: Debugging할려면 Popup으로 설정하여 별도의창
    })
    .then( _ => console.log("Google Login: OK"))
    .catch( e => console.log("Google Login: Failed: " + e ));
  }

  // Custom
  customLogin() {
    this.af.auth.login( this.custToken, {
      provider: AuthProviders.Custom,
      method: AuthMethods.CustomToken
    })
    .then( _ => console.log("Custom Login: OK"))
    .catch( e => console.log("Custom Login: Failed: " + e ));
  }
}
