import { Injectable } from '@angular/core';
import { Headers, Jsonp, Http, URLSearchParams, RequestOptions } from '@angular/http';

declare var Kakao: any;

@Injectable()
export class KakaoDataService {

  constructor( private http:Http, private jsonp: Jsonp ) {
  }

  initKaka( appKey: string ) {
    Kakao.init( appKey ); 
  }

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
        fail: function(err) {
          console.log("Kako Auth: Error: " + err.message );
          reject(err);
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

  getCustomTokenWithId( id ) {
    // Expired..So, Refresh for testing...
    let customToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOiJoc2xlZS5lZGljb25AZ21haWwuY29tIiwiaWF0IjoxNDcwNTYyNTQxLCJleHAiOjE0NzA1NjYxNDEsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoibmdmaXJlMnRlc3RAdml2aWQtdG9yY2gtMzA1Mi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6Im5nZmlyZTJ0ZXN0QHZpdmlkLXRvcmNoLTMwNTIuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.Z_ipUb2Au2u0FDwA54BReQA2L5Ib_vKsnQtBQrby29u2Yl8be9dGX6_sCNbGJKYdh36mwWXEtYk5JDP3OyOHfdIWJoBf1Q5Cb_NJDwUvc66FWSovNiBR7JkVbYgHYTefo8sHrmBYgaESBTydwhyTJ9B5PyOeROdN6lMnKDqP5UuPfKZMdEaQtr0DabSbgOA4em_B8HZY_6PR6UxuDTeTXfGOLBfft9uo_iqiJc63EM22C5h1lJbuA9y2usI0jDQVS7sn9qnXUDCTwiXlrrRijsG2wOTJBMHo7stOUb0z9n-4BRU_SNcV-ODeYTJ1NkZv3XYJLkRuposQzPuVrN3O9w";
    return customToken;
  }
}
