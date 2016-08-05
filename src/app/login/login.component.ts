import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES, // for binding FormGroup/FormControl to template
  FormBuilder,              // for FormBuilder
  Validators,               // For validator
  FormGroup, FormControl
} from '@angular/forms';
import {
  Router,
  RouteParams
} from '@angular/router-deprecated';
import {
  AngularFire,
  FirebaseAuthState, FirebaseAuth
} from 'angularfire2';

import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

// https://github.com/shlomiassaf/angular2-modal/blob/master/QUICKTHROUGH.md
import {Modal, BS_MODAL_PROVIDERS} from 'angular2-modal/plugins/bootstrap/index';
import {AuthDataService} from './service/auth-data.service';
import {ProfileDataService} from './service/profile-data.service';

import 'rxjs/add/operator/do';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  viewProviders: [ ...BS_MODAL_PROVIDERS ],
  providers: [
    MdIconRegistry,
    AuthDataService,
    ProfileDataService
  ],
  directives: [
    REACTIVE_FORM_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdIcon,
  ]
})
export class LoginComponent implements OnInit {
  title = 'Login';

  private focused: boolean;
  private custToken: any;

  user: {
    email: string
    password: string
  } = {
    email: '',
    password: '',
  }

  loginFormBuilder:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthDataService,
    private profileService: ProfileDataService,
    private modal: Modal,  viewContainer: ViewContainerRef ) {

    modal.defaultViewContainer = viewContainer;
  }

  ngOnInit() {
    this.loginFormBuilder = this.formBuilder.group({
      email:['', Validators.required], // first: value, second: sync validator, third: asysnc validator
      password:[]
    });
    // this.popupAlert("Test", "This is a test alert");
    // this.popupPrompt("Test", "This is a test alert");

  }

  gotoHome( loginType: string ) {
    console.log( loginType + ": OK");
    this.router.navigate(['Root']);
  }

  loginError( loginType: string, e:any ) {
    console.log( loginType + ": FAIL: " + e );
    this.popupAlert( loginType, "FAIL: " + e );
  }

  loginMessage( loginType: string, msg:any ) {
    console.log( loginType + ": " + msg );
    this.popupAlert( loginType, msg );
  }

  loginTwitter() {
    this.authService.loginTwitter()
      .then( authState_ => {
        this.gotoHome("Twitter");
      })
      .catch((e:any)=> {
        this.loginError("Login Twitter", e );
      });
  }

  loginFaceBook() {
    this.authService.loginFaceBook()
      .then( authState_ => {
        this.gotoHome("FaceBook");
      })
      .catch((e:any)=> {
        this.loginError("Login FaceBook", e );
      });
  }

  loginGoogle() {
    this.authService.loginGoogle()
      .then( authState => {
        // console.log(authState);
        this.gotoHome("Google");
      })
      .catch((e:any)=> {
        this.loginError("Login Google", e );
      });
  }

  // Custom
  loginCustom() {
    this.authService.loginGoogle()
      .then( authState_ => {
        this.gotoHome("Custom Login");
      })
      .catch((e:any)=> {
        this.loginError("Login Custom", e );
      });
  }

  // Anonymous
  loginGuest() {
    this.authService.loginGuest()
      .then( authState_ => {
        this.gotoHome("Guest Login");
      })
      .catch((e:any)=> {
        this.loginError("Guest Login", e);
    });
  }

  // Submit Login form
  loginSubmit() {
    console.log(this.user.email + '/' + this.user.password);
    this.loginUser( this.user.email,  this.user.password )
  }

  // Email and password
  loginUser( email, password ) {
    this.authService.loginUser( email, password )
      .then( authStatee => {
        this.gotoHome("Login");
      })
      .catch((e:any) => {
        this.loginError("Login", e);
    });
  }

  createUser() {
    if( this.user.email === undefined || this.user.email == "" ||
        this.user.password == undefined || this.user.password == "" ) {
      this.loginMessage("New User", "Input your email and password to create.")
      return;
    }

    this.authService.createUser( this.user.email, this.user.password )
      .then( authState => {
        // Create User Profile
        this.createUserProfile( this.user.email );
      })
      .catch((e:any)=> {
        this.loginError("Sineup", e);
      });
  }

  createUserProfile( mail: any ) {
    this.profileService.createUserProfile(mail)
      .then( _ => {
        // Send notification mail
        this.sendMailNotification();
        // this.gotoHome("Login");
        })
      .catch((e:any) => {
        // Send if failed on CreateProfile
        this.sendMailNotification();
        this.loginError("Create Profile", e );
      });
  }

  sendMailNotification() {
    this.authService.sendMailNotification()
      .then( _ => {
        this.loginMessage("Notification Mail", "Notification email is sent.\nPlease checks the email")
      })
      .catch((e:any) => {
        this.loginError("Notification Mail", e );
    });
  }

  sendPasswordResetEmail() {
    if( this.user.email === null || this.user.email == "" ) {
      this.loginMessage("Reset Password", "Input your email to reset.")
      return;
    }

    this.authService.sendPasswordResetEmail( this.user.email )
    .then( _ => {
      let message: "We just sent you a reset link to your email";
      this.loginMessage("Reset Password", message);
    }, (e:any) => {
      var errorMessage: string;
      switch (e.code) {
        case "auth/invalid-email":
          errorMessage = "You'll need to write a valid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "That user does not exist";
          break;
        case "auth/no-login":
          errorMessage = "That user is not login";
          break;
        default:
          errorMessage = e.message;
      }
      this.loginError("Reset Password", errorMessage);
    });
  }

  deleteUser() {
    this.authService.deleteUser()
      .then( _ => {
        this.loginMessage("Delete User", "Your login account is removed.");
      })
      .catch((e:any)=> {
        this.loginError("Delete User", e );
      });
  }

  delReAuthenticate() {
    this.authService.deleteUser()
      .then( _ => {
        this.deleteUser();
      })
      .catch((e:any) => {
        this.loginError("Re-Authenticat", e );
      });
  }

  logoutUser() {
    this.authService.logoutUser();
  }

  // Firebase Profile
  updateEmail( email:string ) {
    if( this.user.email === null || this.user.email == "" ) {
      this.loginMessage("Update Profile", "Input your email to update.")
      return;
    }
    if( this.authService.getUserId() === undefined ) {
      this.loginMessage("Update Profile", "Login first!!!");
      return;
    }

    if( this.authService.getUserId() === undefined ) {
      this.loginMessage("Update Profile", "Login first!!!");
      return;
    }

    // Update firebase email
    this.authService.updateEmail( email )
    .then( _ => {
      // Update profile email
      this.profileService.updateEmail(email)
        .then( _ => {
          this.loginMessage("Update Email", "Your email is updated.");
        })
        .catch((e:any)=> {
          this.loginError("Update Email", e );
        });
    })
    .catch((e:any)=> {
      this.loginError("Update Email", e );
    });
  }

  updatePassword( pass:string ) {
    if( this.user.password === null || this.user.password == "" ) {
      this.loginMessage("Update Profile", "Input your password to update.")
      return;
    }
    if( this.authService.getUserId() === undefined ) {
      this.loginMessage("Update Profile", "Login first!!!");
      return;
    }

    this.authService.updatePassword( pass )
    .then( _ => {
      this.loginMessage("Update Password", "Your password is updated.");
    })
    .catch((e:any)=> {
      this.loginError("Update Password", e );
    });
  }

  updateProfile( displayName:string, photoUrl:string ) {
    if( displayName === null || displayName === undefined || displayName == ""
     || photoUrl === null || photoUrl === undefined || photoUrl == "" ) {
      this.loginMessage("Update Profile", "Input your name and url to update.")
      return;
    }

    if( this.authService.getUserId() === undefined ) {
      this.loginMessage("Update Profile", "Login first!!!");
      return;
    }

    this.authService.updateProfile( displayName, photoUrl )
    .then( _ => {
      this.loginMessage("Update Profile", "Your profile is updated.");
    })
    .catch((e:any)=> {
      this.loginError("Update Profile", e );
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

  popupAlert( title:string, e:string ) {
      this.modal.alert()
          .title(title)
          .body( e )
          .open();
  }
  popupPrompt( title:string, e:string ) {
      this.modal.prompt()
          .title(title)
          // .dialogClass('popupAlert')
          .open();
  }

  get getUserId() {
    return this.authService.getUserId();
  }

  get getEmailVerified() {
    return this.authService.getEmailVerified();
  }

  get getUser() {
    return JSON.stringify(this.authService.getUser());
  }
}
