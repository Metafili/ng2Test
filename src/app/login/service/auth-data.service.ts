import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  FirebaseAuthState, FirebaseAuth,
  /*AuthCredential,*/ AuthMethods, AuthProviders } from 'angularfire2';

declare var Zone: any;

/**
  Generated class for the AuthData provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthDataService {
  local: Storage;
  public userId: string;
  public emailVerified: boolean;

  public fireUser: FirebaseAuthState;
  public fireAuth: FirebaseAuth;

  constructor( public af: AngularFire ) {
    // console.log('zone: ', Zone.current.name );
    af.auth
      // .do( v => console.log("onAuth: ", v ))
      // .map( u => { return Object.assign({}, u, { auth: null  // makes easier to convert to json }) })
      .subscribe((user:any) => {
        this.fireUser = user;
        if( user  ) {
          this.printUserData(user);
          this.userId = user.uid;
          this.emailVerified = user.auth.emailVerified;
        } else {
          console.log("AuthDataService: No Login: ", user );

        }
      });

    // Callback for catching signInWithCustomToken() using firebase sdk 3.x
    // ToDo: Remove after upgrade bug of Fire2 CustomToken
    // firebase.auth().onAuthStateChanged(function(user) {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        var profile = localStorage.getItem('profile');
        profile = JSON.parse(profile);
        console.log(user);
        this.fireUser = user;
        this.userId = user.uid;
        alert("Auth: OK");
      } else {
        alert("Auth: Fail");
      }
    });
  }

  getUserId() {
    return this.userId;
  }

  setUserId(uid) {
    this.userId = uid;
  }

  getEmailVerified() {
    return this.emailVerified;
  }

  getUser() {
    return this.fireUser;
  }
  // Twitter: Debugging할려면 Popup으로 설정하여 별도의창
  // Twitter: https://apps.twitter.com/ Login
  //  1. Details: App Name --> Description --> Website(with http)
  //  2. Twitter: Setting: Callback URL <-- Firebase: Callback 주소 복사
  // Firebase:
  //  1. API Key: Twitter App API Key 복사
  //  2. API Secret: Consumer Key API: Twitter
  loginTwitter(): Promise<FirebaseAuthState>  {
    return this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    });
  }

  // Facebook: https://developers.facebook.com/
  //  1. RightTop: 검색옆 --> 내앱 --> 새앱추가
  //  2. 앱 ID --> 앱시크릿코드 --> Firebas: API Key/Secret에 복사
  //  3. 제품추가 --> Facebook Login 추가 --> Client OAuth 설정 --> Redirection URL --> 저장
  loginFaceBook(): Promise<FirebaseAuthState>  {
    return this.af.auth.login({
       provider: AuthProviders.Facebook,
      method: AuthMethods.Popup // Redirect: Debugging할려면 Popup으로 설정하여 별도의창
    });
  }

  loginGoogle(): Promise<FirebaseAuthState>  {
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup // Redirect: Debugging할려면 Popup으로 설정하여 별도의창
    });
  }

  loginFirebaseCustom( accessToken: string ): Promise<firebase.User>  {
    return firebase.auth().signInWithCustomToken(accessToken);
  }

  loginFire2Custom( accessToken: string ): Promise<FirebaseAuthState>  {
    return this.af.auth.login( accessToken, {
      provider: AuthProviders.Custom,
      method: AuthMethods.CustomToken
    });
  }

  loginGuest(): Promise<FirebaseAuthState>  {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }

  loginUser(email: string, password: string): Promise<FirebaseAuthState> {
    return this.af.auth.login({
      email: email, password: password
    });
  }

  createUser(email: string, password: string): Promise<FirebaseAuthState> {
    return this.af.auth.createUser({
      email: email, password: password
    });
  }

  sendMailNotification(): Promise<void>  {
    if( this.fireUser!= null )
      return this.af.auth.getAuth().auth.sendEmailVerification();
    else
      return this.noLogin()
  }

  // Firebase SDK 3.x.x
  // https://github.com/angular/angularfire2/issues/374
  sendPasswordResetEmail(email: string): Promise<void> {
    if( this.fireUser!= null )
      return firebase.auth().sendPasswordResetEmail(email);
    else
      return this.noLoginCode()
  }

  noLogin(): Promise<void> {
      return new Promise<void>( function(resolve, reject){
        reject("That user is not login");
      });
  }

  noLoginCode(): Promise<void> {
      return new Promise<void>( function(resolve, reject){
        reject({code:"auth/no-login"});
      });
  }

  deleteUser(): Promise<void> {
    if( this.fireUser!= null )
      return this.af.auth.getAuth().auth.delete();
    else
      return this.noLogin()
  }

  delReAuthenticate(): Promise<void> {
    // let p  = new firebase.auth.EmailAuthProvider();
    // p.credential("hslee.edicon@gmail.com", "edcklb1107");
    // let p = this.af.auth.getAuth().google.provider;
    // let p =  firebase.auth.EmailAuthProvider.PROVIDER_ID; // "password"
    let p = this.af.auth.getAuth().auth.providerId;    // "firebase"
    let provider:firebase.auth.AuthCredential = { provider:p} ;
    return firebase.auth().currentUser.reauthenticate( provider );
    // this.af.auth.getAuth().auth.reauthenticate( provider )
  }

  logoutUser(): void {
    console.log("logoutUser: OK");
    this.userId = undefined;
    this.emailVerified = false;
    this.fireUser = undefined;
    return this.af.auth.logout();
  }

  updateEmail( email:string ): Promise<void> {
    return this.af.auth.getAuth().auth.updateEmail( email );
  }

  updatePassword( pass:string ): Promise<void> {
    return this.af.auth.getAuth().auth.updatePassword( pass );
  }

  // Use firebase skd 3.x because of signInWithCustomToken use sdk 3.x
  updateProfile( displayName:string, photoUrl:string ): Promise<void> {
    return firebase.auth().currentUser.updateProfile(
    {
      displayName: displayName,
      photoURL: photoUrl
    });
  }
  // Use fire2
  updateProfile2( displayName:string, photoUrl:string ): Promise<void> {
    return this.af.auth.getAuth().auth.updateProfile(
    {
      displayName: displayName,
      photoURL: photoUrl
    });
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
}