import { Injectable } from '@angular/core';
import { Headers, Jsonp, Http, Response, RequestOptions } from '@angular/http';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  FirebaseAuthState, FirebaseAuth,
  /*AuthCredential,*/ AuthMethods, AuthProviders } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

declare var Kakao: any;

export interface KakaoUserInfo {
  "id":string,
  "properties": {
      "nickname":string,
      "thumbnail_image":string,
      "profile_image":string,
  }
}

@Injectable()
export class KakaoDataService {

  public userId: string;
  public emailVerified: boolean;

  public fireUser: FirebaseAuthState;
  public fireAuth: FirebaseAuth;

  constructor( public af: AngularFire, private http:Http, private jsonp: Jsonp ) {
    af.auth
      .subscribe((user:any) => {
        this.fireUser = user;
        if( user  ) {
          this.printUserData(user);
          this.userId = user.uid;
          this.emailVerified = user.auth.emailVerified;
        } else {
          console.log("KakaoDataService: No Login: ", user );
        }
      });
  }

  initKaka( appKey: string ) {
    Kakao.init( appKey );
  }

  // ERROR: 1번째 Call에서 Callback이 getAuth로 됨.
  // #kakao-login-btn을 Call한 Context로 Callback이 설정됨.
  getAuth(): Promise<any> {
    let that = this;
    return new Promise( function( resolve, reject ) {
      Kakao.Auth.createLoginButton({
        container: '#kakao-login-btn',
        success: function(auth) {
          console.log("Kakao Auth: " + JSON.stringify(auth));
          // alert(JSON.stringify(auth));
          // that.getUserInfo();
          resolve(auth);
        },
        fail: function(e) {
          console.log("Kako Auth: Error: " + e.message );
          reject(e);
        }
        });
    });
  }

  // curl -v -X GET https://kapi.kakao.com/v1/user/me -H "Authorization: Bearer 2E7QjXo33KQ1sCkHaiaTL91Ot28h_SzOZPEaD6wQQjMAAAFWYuyZCg"
  getUserInfo(): Promise<any> {
    return new Promise( function( resolve, reject ){
      let settings = {
        //호출할 API URL
        url : "/v1/user/me",
        success : function(result){
          // console.log("Kakao: UserInfo: " + JSON.stringify(result));
          resolve(result);
        },
        fail : function(e){
          console.log(e);
          reject( e );
        },
        always : function(o){
          // alert("Kakao Allways Callbask: " + o);
        },
      };
      Kakao.API.request(settings);
    })
  }

  getUserInfo2( accessToken:string ): any {
    let kakaoUserInfoUrl = 'https://kapi.kakao.com/v1/user/me ';
    let body = JSON.stringify({});
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': 'Bearer ' + accessToken
        });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(kakaoUserInfoUrl, body, options )
        .toPromise();
    }

  // $curl -H "Content-Type: application/json" \
  //  -X POST -d '{"username":"hslee@gmail.com","password":"1234"}' \
  //  http://localhost:8080/login
  getCustomTokenWithId( kakao:KakaoUserInfo ): Promise<Response> {
    const body = {
      uid: kakao.id,
      username: kakao.properties.nickname,
    };

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      'http://localhost:8080/kakao', // URL
      JSON.stringify(body),          // Body
      { headers: headers })          // Header
      .toPromise();
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
