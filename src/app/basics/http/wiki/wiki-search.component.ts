import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, Control } from '@angular/common';
import {JSONP_PROVIDERS, Jsonp} from '@angular/http';

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/switchMap';

import { WikiServiceService } from './service/wiki-service.service';

@Component({
  moduleId: module.id,
  selector: 'app-wiki-search',
  templateUrl: 'wiki-search.component.html',
  styleUrls: ['wiki-search.component.css'],
  providers: [
    WikiServiceService,
    JSONP_PROVIDERS
  ],
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class WikiSearchComponent implements OnInit {
  title = 'WiKi Searching using OBS';
  // For Obserable Operator
  wikiRawItems: Array<string>;
  wikiObsItems: Observable<Array<string>>;

  rawTerm = new Control();
  term = new Control();

  constructor( private wikiService: WikiServiceService ) {
        // rawTerm
    this.rawTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap( term => this.wikiService.rawSearch(term))
      // .mergeMap( term => this.wikiService.search(term)) // flatMap
      // .subscribe( term => this.wikiService.search(term)
      // .then( items => this.wikiItems = items));
      .subscribe( (items:Observable<Array<string>>) => this.wikiObsItems = items);

    // Term
    this.wikiObsItems = this.wikiService.search( this.term.valueChanges);
  }

  ngOnInit() {
    // Init Observable
    this.obsEvent();
  }

  // e.target.value: http://stackoverflow.com/questions/33523241/e-target-is-accessible-but-e-target-value-is-not-in-react-component
  obsEvent() {
    let demoInput = document.querySelector('#demo');
    let obs = Observable
              .fromEvent(demoInput, 'input')
              .map((e: any) => e.target.value ) // dot notation 이 안되는 이유는?
              // .map( e => e['target'].value )
              // .filter( value => value > 100 )
              .map(v => {
                return {
                  value : v,
                  length: v.length
                };
              });
        obs.subscribe( event => {
          console.log(event);
          /*
          console.log('type: ' + event['type'] + ', target: ' + event['target'] );
          console.log('hasOwnProperty: ' + event.hasOwnProperty('type'));
          for( var p in event ) {
            if( event.hasOwnProperty(p))
              console.log('Own Prop: ' + p + ':' + event[p]);
            else
              console.log('Inherited Prop: ' + p );
          }
          */
      });
  }

  // keyup event
  rawSearch (term) {
    this.wikiService.rawSearch(term)
      .subscribe(items => this.wikiRawItems = items);
  }

  promiseSearch (term) {
    this.wikiService.promiseSearch(term)
      .then(items => this.wikiRawItems = items);
  }

}
