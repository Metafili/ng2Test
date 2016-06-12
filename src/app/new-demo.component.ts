import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';
import {JSONP_PROVIDERS, Jsonp} from '@angular/http';
import { 
  AngularFire, 
  FirebaseObjectObservable, FirebaseListObservable,
  AuthMethods, AuthProviders  } from 'angularfire2';

import { WikiServiceService } from './wiki-service.service';

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/switchMap';


@Component({
  moduleId: module.id,
  selector: 'new-demo-app',
  templateUrl: 'new-demo.component.html',
  styleUrls: ['new-demo.component.css'],
  providers: [
    WikiServiceService,
    JSONP_PROVIDERS
  ]
})

// eBook: http://book.mixu.net/node/index.html
export class NewDemoAppComponent implements OnInit {
  title = 'new-demo works!';
  itemKey: any;
  item: FirebaseObjectObservable<any>;  // ObjectObservable
  items: FirebaseListObservable<any[]>; // ListObservable
  sizeSubject: Subject<any>;
  mapitems: Observable<any[]>; // ListObservable

  // For Obserable Operator 
  wikiRawItems: Array<string>;
  wikiObsItems: Observable<Array<string>>;

  rawTerm = new Control();
  term = new Control();
  
  constructor( 
    public af: AngularFire,
    private wikiService: WikiServiceService ) {
    this.sizeSubject = new Subject();
    this.items = af.database.list('/items', {
     // preserveSnapshot: true,
     // Bug: updateItem
     /* 
     query: {
        orderByKey: true,
        // orderByChild: 'size',
        equalTo: this.sizeSubject
     }
      */
    });
    this.item = af.database.object('/items/1')
    // this.item = this.items[0];

    // rawTerm
    this.rawTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap( term => this.wikiService.rawSearch(term))
      // .mergeMap( term => this.wikiService.search(term)) // flatMap
      // .subscribe( term => this.wikiService.search(term)
      // .then( items => this.wikiItems = items));
      .subscribe( items => this.wikiObsItems = items);

    // Term
    this.wikiObsItems = this.wikiService.search( this.term.valueChanges);
  }
  
  ngOnInit() {
    console.log("ngOnInit: ");
    this.items.subscribe( item => {
      console.log('Item.subscribe: ' + item );
    });
    this.items.forEach( item => { 
      let s = JSON.stringify(item);
      console.log( s );
      
      item.forEach( item => {
        // let n = item['name'];
        let n = item.name;
        let k = item.$key;
        let s = JSON.stringify(item);
        console.log( s + ', key: ' + k + ', name: ' + n );
      });
    })
    .then( n =>  console.log('forEach: End' + n))
    .catch( e => console.log(e));
    /* For preserveSnapshot: true
    this.items
      .map(snapshots => {
        snapshots.forEach(snapshot => console.log(snapshot.key()));
      })
      .subscribe(snapshots => console.log(snapshots));
    */
    // this.item = this.items[0];

    // Init Observable
    this.obsEvent();
  }
  
  //JavaScript: String, TypeScript: string
  save(newName: string) {
    this.item.set({ name: newName})
    .then(_ => console.log("Success"))
    .catch( err => console.log(err, "Failed"));
  }
  
  update(newSize: string) {
   this.item.update({ size: newSize})
   .then(_ => console.log("Update Size: OK"))
   .catch( e => console.log("Update Size: Fail"));
    console.log("Item Updated");
  }
  
  push( newName: string ) {
    this.items.push({ name: newName });
  }
  
  updateItem(newSize: string, key: string) {
   this.items.update( key, {size: newSize})
   .then(_ => console.log("Update Item: OK"))
   .catch( e => console.log("Update Item: Fail"));
    console.log("Item Updated");
  }
  
  delete() {
    console.log("Item Deleted");
  }
  
  filterBy( size: string) {
      this.sizeSubject.next(size);
      console.log("filter: " + size);
  }
  
  anoLogin() {
    // this.af.auth.login();
    // Anonymous
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    })
    .then(_ => console.log("Login: OK"))
    .catch( e => console.log("Login: Failed"));
  }
  
  // Email and password
  emailLogin() {
    /*
    this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
    .then(_ => {
      console.log("Email Login: OK")
      this.af.auth.login({ 
      email: 'hslee.edicon@gmail.com', password: '1234' })
      .then(_ => console.log("Email Login: OK"))
      .catch( e => console.log("Email Login: Failed"));
    })
    .catch( e => console.log("Email Login: Failed"));
    */
    
    this.af.auth.login({ 
      email: 'hslee.edicon@gmail.com', password: '1234' })
      .then(_ => console.log("Email Login: OK"))
      .catch( e => console.log("Email Login: Failed"));
  }
  
  // Twitter
  twittLogin() {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    })
    .then(_ => console.log("Twitter Login: OK"))
    .catch( e => console.log("Twitter Login: Failed"));
  }

  // http://slides.com/robwormald/everything-is-a-stream#/68
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
