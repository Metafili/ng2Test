import { Component, OnInit, ElementRef } from '@angular/core';

declare var jsSHA: any;
declare var Kakao: any;

/**
 * Include External JavaScript Libraries In An Angular 2 TypeScript Project
 *  -https://www.thepolyglotdeveloper.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/
 */
@Component({
  moduleId: module.id,
  selector: 'external-lib',
  templateUrl: 'external-lib.component.html',
  styleUrls: ['external-lib.component.css']
})
export class ExternalLibComponent implements OnInit {

  shaObj: any;
  hash: String;
  kakaoObj:any;

  constructor(private elementRef:ElementRef) {
    this.shaObj = new jsSHA("SHA-512", "TEXT");
    this.shaObj.update("This is a test");
    this.hash = this.shaObj.getHash("HEX");


  }

  ngOnInit() {
     this.initKakao()
     // this.loginKakao();
     this.loginWithKakao();
  }

/**
 * script tag in angular2 template / hook when template dom is loaded
 * -http://stackoverflow.com/questions/34140065/script-tag-in-angular2-template-hook-when-template-dom-is-loaded
 */
  ngAfterViewInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    // s.src = "//developers.kakao.com/sdk/js/kakao.min.js";
    alert("External JS: Test Alert");
    this.elementRef.nativeElement.appendChild(s);

    // this.loginKakao();
  }

  initKakao() {
    Kakao.init('d3dbe68b215fa7ddc7b19707f56bb88d');
  }

  loginKakao() {
    // Kakao.init('d3dbe68b215fa7ddc7b19707f56bb88d');
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        alert(JSON.stringify(authObj));
      },
      fail: function(err) {
         alert(JSON.stringify(err));
      }
    });
  }

  loginWithKakao() {
     // Kakao.init('d3dbe68b215fa7ddc7b19707f56bb88d');
     Kakao.Auth.login({
        success: function(authObj) {
          alert(JSON.stringify(authObj));
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
     });
  }
}
