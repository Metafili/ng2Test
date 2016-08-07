/**
* This should come as no surprise, we need to import Injectable so we can use this provider as an injectable.
* We also need to import firebase so we can talk to our DB.
*/
import { Injectable } from '@angular/core';


import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  FirebaseAuthState, FirebaseAuth,
  /*AuthCredential,*/ AuthMethods, AuthProviders } from 'angularfire2';
import 'rxjs/add/operator/do';

@Injectable()
export class ProfileDataService {
  public userProfile: any; // We'll use this to create a database reference to the userProfile node.
  public currentUser: any; // We'll use this to create an auth reference to the logged in user.

  constructor( public af: AngularFire ) {
    af.auth
      // .do( v => console.log("onAuth: ", v ))
      .subscribe((user:any) => {
        this.currentUser = user;
        if( user ) {
          // this.printUserData(user);
        } else {
          console.log("ProfileDataService: No Login: ", user );
        }
      });

    this.userProfile = firebase.database().ref('/userProfile');
  }

  // Firebase 3.x SDK: .set for create a node
  createUserProfile( email: string): Promise<any> {
    return this.userProfile.child(this.currentUser.uid).set({
      email:email
    });
  }
  
  createCustomUserProfile( uid:string, email: string): Promise<any> {
    return this.userProfile.child(uid).set({
      email:email
    });
  }

  /**
  * This one should be really easy to follow, we are calling a function getUserProfile() that takes no parameters.
  * This function returns a DATABASE reference to the userProfile/uid of the current user
  * and we'll use it to get the user profile info in our page.
  */
  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  /**
  * This one takes 2 string parameters, firstName & lastName, it just saves those 2 to the userProfile/uid node
  * for the current user as the firstName & lastName properties.
  */
  updateName(firstName: string, lastName: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  /**
  * Pretty much the same as before, just that instead of saving the name it's saving the date of birth
  */
  updateDOB(birthDate: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(email: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      email: email
    });
  }
}
