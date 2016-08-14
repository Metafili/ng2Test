import { provideRouter, RouterConfig }  from '@angular/router';

import { Fire2Component }               from './fire2/fire2.component';
import { OfflineComponent }             from './fire2/offline/offline.component';
import { StorageComponent }             from './fire2/storage/storage.component';
import { ObsBaiscComponent }            from './obs/obs-baisc/obs-baisc.component';
import { HttpComponent }                from './basics/http/http.component';
import { WikiSearchComponent }          from './basics/http/wiki/wiki-search.component';
import { CommentComponent }             from './obs/comments/comment.Component';
import { GesturesComponent }            from './material2/gestures/gestures.component';
import { HeroFormComponent }            from './basics/hero-form/hero-form.component';
import { ModelDrivenFormComponent }     from './basics/forms/model-driven-form/model-driven-form.component';
import { TemplateDrivenFormComponent }  from './basics/forms/template-driven-form/template-driven-form.component';
import { CustomFormComponent }          from './basics/forms/custom-form/custom-form.component';
import { ExternalLibComponent }         from './basics/external-lib/external-lib.component';

import { ContentProjectionComponent }   from './basics/content-projection/content-projection.component';
import { WordListComponent }            from './mglish/word-list/word-list.component';
import { GetMwordComponent }            from './mglish/get-mword/get-mword.component';
import { LoginComponent }               from './login/login.component';
import { CustomLoginComponent }         from './login/test/custom-login/custom-login.component';
import { LoggedInRouterOutlet }         from './login/LoggedInRouterOutlet';
import { AnimationComponent }           from './design/animation/animation.component';
import { ChildRouteComponent }          from './basics/route/child-route/child-route.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/observable', terminal: true },   // remove leading '/' at path
  // {path: '/',                 name: 'Root',         component: ObsBaiscComponent, useAsDefault: true },
  {path: 'fire2',               component: Fire2Component },
  {path: 'fire2offline',        component: OfflineComponent },
  {path: 'fire2storage',        component: StorageComponent },
  {path: 'observable',          component: ObsBaiscComponent },
  {path: 'http',                component: HttpComponent },
  {path: 'obscomment',          component: CommentComponent },
  {path: 'wikisearch',          component: WikiSearchComponent },
  {path: 'gestures',            component: GesturesComponent },
  {path: 'basicform',           component: HeroFormComponent },
  {path: 'modelform',           component: ModelDrivenFormComponent },
  {path: 'templateform',        component: TemplateDrivenFormComponent },
  {path: 'customform',          component: CustomFormComponent },
  {path: 'contentproject',      component: ContentProjectionComponent },
  {path: 'wordlist',            component: WordListComponent },
  {path: 'getmword',            component: GetMwordComponent },
  {path: 'externallib',         component: ExternalLibComponent },
  {path: 'login',               component: LoginComponent },
  {path: 'customlogin',         component: CustomLoginComponent },
  {path: 'animation',           component: AnimationComponent },
  {path: 'child',               component: ChildRouteComponent, 
    children: [
      { path: 'fire2offline',   component: OfflineComponent},
      { path: 'fire2storage',   component: StorageComponent}
    ]
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];