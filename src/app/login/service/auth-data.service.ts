import { Injectable, ViewContainerRef } from '@angular/core';
import {
  Router,
  RouteParams
} from '@angular/router-deprecated';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  FirebaseAuthState, FirebaseAuth,
  /*AuthCredential,*/ AuthMethods, AuthProviders } from 'angularfire2';

// https://github.com/shlomiassaf/angular2-modal/blob/master/QUICKTHROUGH.md
import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap';

declare var Zone: any;

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {
  public fireUser: FirebaseAuthState;
  public fireAuth: FirebaseAuth;

  public userProfile: FirebaseObjectObservable<any>;  // ObjectObservable
  local: Storage;
  data: any;

  constructor(
    public af: AngularFire,
    private router: Router,
    public modal: Modal, viewContainer: ViewContainerRef ) {
    modal.defaultViewContainer = viewContainer;
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

    this.userProfile = this.af.database.object('/userProfile');
    this.data = null;
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

  loginUser(email: string, password: string): any {
    return this.af.auth.login({
      email: email, password: password
    })
    .then( _ => {
      console.log("Email Login: OK")
      this.router.navigate(['Root']);
    })
    .catch((e:any) => {
      console.log("Email Login: Failed: " + e );
      this.popupAlert("Login Failed: ", e );
    });
  }

  signupUser(email: string, password: string): any {
    return this.af.auth.createUser({
      email: email, password: password
    })
    .then( _ => {
      console.log("Sineup: OK");
      this.sendMailNotification();
      // ToDo this.userProfile.update({this.fireUser.uid:{ email: email }})
      this.userProfile.update(this.fireUser.uid)
      .then(() => {
          this.router.navigate(['Root']);
          // this.nav.setRoot(HomePage); // ToDo
        })
      .catch((e:any) => {
        console.log("Profile: Failed: " + e )
        this.popupAlert("Profile Failed: ", e );
      });
    })
    .catch((e:any)=> { console.log()
        this.popupAlert("Signup Failed: ", e );
      });
  }

  sendMailNotification(): any  {
    return this.af.auth.getAuth().auth.sendEmailVerification()
    .then( _ => console.log("sendMailNotification: OK"))
    .catch((e:any) => {
      console.log("sendMailNotification: Failed: " + e );
      this.popupAlert("Send Mail Notification: ", e );
    });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email).then((user) => {
      let message: "We just sent you a reset link to your email";
      this.popupAlert("Password Reset: ", message );
      this.router.navigate(['Root']);
      // this.nav.present(prompt); ToDo

    }, (e:any) => {
      var errorMessage: string;
      switch (e.code) {
        case "auth/invalid-email":
          errorMessage = "You'll need to write a valid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "That user does not exist";
          break;
        default:
          errorMessage = e.message;
      }

      this.popupAlert("Send Password Reset Mail: ", errorMessage );
      this.router.navigate(['Root']);
      // ToDo this.nav.present(prompt);
    });
  }

  deleteUser() {
    this.af.auth.getAuth().auth.delete()
    .then( _ => console.log("deleteUser: OK"))
    .catch((e:any)=> {
      console.log("deleteUser: Failed: " + e )
      this.popupAlert("Delete User: ", e );
    });
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
    .catch((e:any) => {
      console.log("reAuthenticate: Failed: " + e )
      this.popupAlert("Re-Authenticate: ", e );
    });
  }

  // Anonymous
  anoLogin() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    })
    .then(_ => console.log("Guest Login: OK"))
    .catch((e:any)=> {
      console.log("Guest Login: Failed: " + e )
      this.popupAlert("Guest Login: ", e );
    });
  }

  logoutUser(): any {
    console.log("logOut: OK");
    return this.af.auth.logout();
  }

  updateEmail( email:string ) {
    this.af.auth.getAuth().auth.updateEmail( email )
    .then( _ => console.log("updateEmail: OK"))
    .catch((e:any)=> {
      console.log("updateEmail: Failed: " + e )
      this.popupAlert("Update Email:", e );
    }) ;
  }

  updatePassword( pass:string ) {
    this.af.auth.getAuth().auth.updatePassword( pass )
    .then( _ => console.log("updatePassword: OK"))
    .catch(( e:any ) => {
      console.log("updatePassword: Failed: " + e )
      this.popupAlert("Update Password:", e );
    });
  }

  updateProfile( displayName:string, photoUrl:string ) {
    this.af.auth.getAuth().auth.updateProfile({
      displayName: displayName,   // "Jane Q. User",
      photoURL: photoUrl          // "https://example.com/jane-q-user/profile.jpg"
    })
    .then( _ => console.log("updateProfile: OK"))
    .catch(( e:any ) => {
      console.log("updateProfile: Failed: " + e )
      this.popupAlert("Update Profile:", e );
    });
  }

  popupAlert( title:string, e:string ) {
      this.modal.alert()
          .title(title)
          .body('Failed: ' + e )
          .open();
  }
}