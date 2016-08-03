import { Component, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  FirebaseAuthState, FirebaseAuth,
  /*AuthCredential,*/ AuthMethods, AuthProviders } from 'angularfire2';
import {MdButton} from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import 'rxjs/add/operator/do';

declare var Zone: any;

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
  title = 'Login';
  fireUser: FirebaseAuthState;
  fireAuth: FirebaseAuth;
  private emailId: string;
  private password: string;
  private focused: boolean;
  private custToken: any;

  constructor( public af: AngularFire ) {
    af.auth
      .do( v => console.log("onAuth: ", v ))
      /* .map( u => {
        return Object.assign({}, u, {
          auth: null  // makes easier to convert to json
        })
      }) */
      .subscribe((user:any) => {
        // console.log('user: ', user );
        console.log('zone: ', Zone.current.name );

        this.fireUser = user;
        if( user && user.auth.emailVerified ) {
          this.printUserData(user);
        } else {
          console.log("No Login: ", user );
        }
      });
  }

  ngOnInit() {
  }

  printUserData( user: any ) {
      console.log("User: ", user.uid + '/' +  user.provider );
      if( user.auth.providerData.length != 0 ) {
        user.auth.providerData.forEach(function (profile) {
          console.log("Provider: "  + profile.providerId);
          console.log("  UID: "     + profile.uid);
          console.log("  Name: "    + profile.displayName);
          console.log("  Email: "   + profile.email);
          console.log("  photoURL: "+ profile.photoURL);
        });
      }
  }

  updateEmail( email:string ) {
    this.af.auth.getAuth().auth.updateEmail( email )
    .then( _ => console.log("updateEmail: OK"))
    .catch( e => console.log("updateEmail: Failed: " + e ));
  }

  updatePassword( pass:string ) {
    this.af.auth.getAuth().auth.updatePassword( pass )
    .then( _ => console.log("updatePassword: OK"))
    .catch( e => console.log("updatePassword: Failed: " + e ));
  }

  updateProfile( displayName:string, photoUrl:string ) {
    this.af.auth.getAuth().auth.updateProfile({
      displayName: displayName,   // "Jane Q. User",
      photoURL: photoUrl          // "https://example.com/jane-q-user/profile.jpg"
    })
    .then( _ => console.log("updateProfile: OK"))
    .catch( e => console.log("updateProfile: Failed: " + e ));
  }

  sendMailNotification() {
    this.af.auth.getAuth().auth.sendEmailVerification()
    .then( _ => console.log("sendMailNotification: OK"))
    .catch( e => console.log("sendMailNotification: Failed: " + e ));
  }

  // https://github.com/angular/angularfire2/issues/374
  sendPasswordResetEmail() {
    firebase.auth().sendPasswordResetEmail( this.emailId )
    .then( _ => console.log("sendPasswordReset: OK"))
    .catch( e => console.log("sendPasswordReset: Failed: " + e ));;
  }

  deleteUser() {
    this.af.auth.getAuth().auth.delete()
    .then( _ => console.log("deleteUser: OK"))
    .catch( e => console.log("deleteUser: Failed: " + e ));
  }

  delReAuthenticate() {
    // let p  = new firebase.auth.EmailAuthProvider();
    // p.credential("hslee.edicon@gmail.com", "edcklb1107");
    // let p = this.af.auth.getAuth().google.provider;
    // let p =  firebase.auth.EmailAuthProvider.PROVIDER_ID; // "password"
    let p = this.af.auth.getAuth().auth.providerId;    // "firebase"
    let provider:firebase.auth.AuthCredential = { provider:p} ;
    firebase.auth().currentUser.reauthenticate( provider )
    // this.af.auth.getAuth().auth.reauthenticate( provider )
    .then( _ => {
      console.log("reAuthenticate: OK")
      this.deleteUser();
    })
    .catch( e => console.log("reAuthenticate: Failed: " + e ));
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
    })
    .then(_ => console.log("Guest Login: OK"))
    .catch( e => console.log("Guest Login: Failed: " + e ));
  }

  // Email and password
  emailLogin() {
    this.af.auth.login({
      // email: 'hslee.edicon@gmail.com', password: '1234'
      email: this.emailId, password: this.password
    })
    .then( _ => console.log("Email Login: OK"))
    .catch( e => console.log("Email Login: Failed: " + e ));
  }

  createLogin() {
    this.af.auth.createUser({
      email: this.emailId, password: this.password
    })
    .then( _ => {
      console.log("Create Login: OK");
      this.sendMailNotification();
    })
    .catch( e => console.log("Create Login: Failed: " + e ));
  }

  logOut() {
    this.af.auth.logout();
    console.log("logOut: OK");

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
    })
    .then( _ => console.log("Twitter Login: OK"))
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

  get getUser() {
    return JSON.stringify(this.fireUser);
  }
}
