import { Component, OnInit } from '@angular/core';
import {
  Router, RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS } from '@angular/router-deprecated';
// import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { Fire2Component }       from './fire2/fire2.component';
import { ObsBaiscComponent }    from './obs/obs-baisc/obs-baisc.component';
import { WikiSearchComponent }  from './obs/wiki-search/wiki-search.component';
import { GesturesComponent }    from './material2/gestures/gestures.component';
import { LoginComponent }       from './login/login.component';


@RouteConfig([
  {path: '/',            name: 'Root',        component: ObsBaiscComponent, useAsDefault: true },
  {path: '/fire2',       name: 'AngularFire2',component: Fire2Component },
  {path: '/observable',  name: 'Observabe',   component: ObsBaiscComponent },
  {path: '/wikisearch',  name: 'WikiSearch',  component: WikiSearchComponent },
  {path: '/gestures',    name: 'MdGestures',  component: GesturesComponent },
  {path: '/login',       name: 'Login',       component: LoginComponent }
])


@Component({
  moduleId: module.id,
  selector: 'ng2-test-app',
  templateUrl: 'ng2-test.component.html',
  styleUrls: ['ng2-test.component.css'],
  providers: [
    ROUTER_PROVIDERS
  ],
  directives: [
    ROUTER_DIRECTIVES
  ]
})

// eBook: http://book.mixu.net/node/index.html
export class Ng2TestAppComponent implements OnInit {
  title = 'Ng2 Test';

  constructor() {}

  ngOnInit() {
    console.log("ngOnInit: ");
  }
}
