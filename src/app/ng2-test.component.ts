import { Component, OnInit } from '@angular/core';
import {
  Router, RouteConfig,
  ROUTER_DIRECTIVES,
  ROUTER_PROVIDERS } from '@angular/router-deprecated';
// import { Router, Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { Fire2Component }       from './fire2/fire2.component';
import { OfflineComponent }     from './fire2/offline/offline.component';
import { StorageComponent }     from './fire2/storage/storage.component';
import { ObsBaiscComponent }    from './obs/obs-baisc/obs-baisc.component';
import { HttpComponent }        from './basics/http/http.component';
import { WikiSearchComponent }  from './basics/http/wiki/wiki-search.component';
import { CommentComponent }     from './obs/comments/comment.Component';
import { GesturesComponent }    from './material2/gestures/gestures.component';
import { HeroFormComponent }           from './basics/hero-form/hero-form.component';
import { ModelDrivenFormComponent }    from './basics/forms/model-driven-form/model-driven-form.component';
import { TemplateDrivenFormComponent } from './basics/forms/template-driven-form/template-driven-form.component';
import { CustomFormComponent }         from './basics/forms/custom-form/custom-form.component';
import { ExternalLibComponent }        from './basics/external-lib/external-lib.component';

import { ContentProjectionComponent } from './basics/content-projection/content-projection.component';
import { WordListComponent }    from './mglish/word-list/word-list.component';
import { GetMwordComponent }    from './mglish/get-mword/get-mword.component';
import { LoginComponent }       from './login/login.component';
import { CustomLoginComponent }       from './login/test/custom-login/custom-login.component';
import {LoggedInRouterOutlet} from   './login/LoggedInRouterOutlet';
import {AnimationComponent} from     './design/animation/animation.component';

@RouteConfig([
  {path: '/',                 name: 'Root',         component: ObsBaiscComponent, useAsDefault: true },
  {path: '/fire2',            name: 'Fire2',        component: Fire2Component },
  {path: '/fire2offline',     name: 'Fire2Offline', component: OfflineComponent },
  {path: '/fire2storage',     name: 'Fire2Storage', component: StorageComponent },
  {path: '/observable',       name: 'Observabe',    component: ObsBaiscComponent },
  {path: '/http',             name: 'Http',         component: HttpComponent },
  {path: '/obscomment',       name: 'ObsComments',  component: CommentComponent },
  {path: '/wikisearch',       name: 'WikiSearch',   component: WikiSearchComponent },
  {path: '/gestures',         name: 'MdGestures',   component: GesturesComponent },
  {path: '/basicform',        name: 'BasicForms',   component: HeroFormComponent },
  {path: '/modelform',        name: 'ModelForm',    component: ModelDrivenFormComponent },
  {path: '/templateform',     name: 'TemplateForm', component: TemplateDrivenFormComponent },
  {path: '/customform',       name: 'CustomForm',   component: CustomFormComponent },
  {path: '/contentproject',   name: 'ContentProjection',component: ContentProjectionComponent },
  {path: '/wordlist',         name: 'WordList',     component: WordListComponent },
  {path: '/getmword',         name: 'GetMword',     component: GetMwordComponent },
  {path: '/externallib',      name: 'ExtLib',       component: ExternalLibComponent },
  {path: '/login',            name: 'Login',        component: LoginComponent },
  {path: '/customlogin',      name: 'CustomLogin',  component: CustomLoginComponent },
  {path: '/animation',        name: 'Ani',          component: AnimationComponent }
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
    ROUTER_DIRECTIVES,
    // LoggedInRouterOutlet
  ]
})

// eBook: http://book.mixu.net/node/index.html
export class Ng2TestAppComponent implements OnInit {
  title = 'Ng2 Test';

  constructor() { }

  ngOnInit() {
    console.log("ngOnInit: ");
  }
}
