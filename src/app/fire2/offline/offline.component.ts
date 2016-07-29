import { Component, Inject, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseApp, FirebaseRef,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

// ERROR: Workaround(TSC: cannot find name firebase):
// "node_modules/angularfire2/firebase3.d.ts" --> paste to src/firebase3.d.ts
// tsconfig.json: files.firebase3.d.ts <-- node_modules/.../firebase3.d.ts
// MUST be restart VSC AFTER modifying tsconfig.json

// AngularFire2: Firebase Offline
// https://www.firebase.com/docs/web/guide/offline-capabilities.html#section-local
// FirebaseRef: ref.on/ref.once()
// gitter: https://github.com/easierbycode/af2-wtf/commit/1c7184411f4bec8fa2b1b206b4f5b803e677f9d3

// var myConnectionsRef: any; === static myConnectionsRef: any in Class
// static은 template에서 access할 수 없음. <--Security?
// https://github.com/angular/angular/issues/6429
//
// Lexical Closure: this/self: Getting Out of Binding Situations in JavaScript
//  -http://alistapart.com/article/getoutbindingsituations
//  -https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures
//  -http://stackoverflow.com/questions/12930272/javascript-closures-vs-anonymous-functions
//  -http://stackoverflow.com/questions/17279437/lexical-scope-closures-in-javascript
//  **-https://spin.atomicobject.com/2014/10/20/javascript-scope-closures/

@Component({
  moduleId: module.id,
  selector: 'app-offline',
  templateUrl: 'offline.component.html',
  styleUrls: ['offline.component.css']
})

export class OfflineComponent implements OnInit {

  app: firebase.app.App;
  rootRef: firebase.database.Reference;

  myConnections$: FirebaseListObservable<any[]>
  lastOnline$: FirebaseObjectObservable<any>;
  connected$: FirebaseObjectObservable<any>;

  // static myConnections to lexical closures
  myConnectionsRef:any;
  lastOnlineRef: any;
  connectedRef: any;
  myConnections:any;
  lastOnline:any;
  connedted:any;
  test:string = "TEST";

  // Firebase: constructor(@Inject(FirebaseRef) ref:Firebase) {
  constructor(
    @Inject(FirebaseApp) firebaseApp: firebase.app.App,
    af: AngularFire ) {

    this.myConnections$ = af.database.list('/users/edicon/connections');
    this.lastOnline$ = af.database.object('/users/edicon/lastOnline');
    this.connected$ = af.database.object('/.info/connected');

    this.app = firebaseApp;
    this.rootRef = this.app.database().ref();
    this.myConnectionsRef = this.app.database().ref('/users/edicon/connections');
    this.lastOnlineRef = this.app.database().ref('/users/edicon/lastOnline');
    this.connectedRef = this.app.database().ref('/.info/connected');

    this.rootRef.on('value', this.doSomething);
  }

  doSomething( snapshot ) {
    console.log(snapshot.val());
  }

  ngOnInit() {
      var ngThis = this;
    /*
    this.connected$
    .filter( snap => snap.$value == true )
    .subscribe( s => {
      // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

      // add this device to my connections list
      // this value could contain info about the device or a timestamp too
      var con = this.myConnections$.push(true);

      // when I disconnect, remove this device
      // con.onDisconnect().remove(true);
      // con.onDisconnect().remove();

      // when I disconnect, update the last time I was seen online
      // this.lastOnline.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
      // this.lastOnline.update( {timestamp: firebase.database.ServerValue.TIMESTAMP});

    });
    */

    var offsetRef = firebase.database().ref(".info/serverTimeOffset");
    offsetRef.on("value", function(snap) {
      var offset = snap.val();
      var estimatedServerTimeMs = new Date().getTime() + offset;
      console.log("offsetRef: offset --> " + estimatedServerTimeMs + " : " + offset );
    });

    this.myConnectionsRef.on('value', function(snap) {
      var that = ngThis;
      that.myConnections = snap.val();
      console.log("myConnections: " + that.myConnections);
    });

    this.lastOnlineRef.on('value', function(snap) {
      var that = ngThis;
      that.lastOnline = snap.val();
      console.log("lastOnlineRef: " + that.lastOnline);
    });

    this.connectedRef.on('value', function(snap) {
      var that = ngThis;
      that.connedted = snap.val();
      console.log("connected: " + that.connedted);
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

        // add this device to my connections list
        // this value could contain info about the device or a timestamp too
        var con = that.myConnectionsRef.push(true);

        // when I disconnect, remove this device
        con.onDisconnect().remove(function(e) {
          if( e ) {
            console.error("onDisconnect: ",  e);
          }
        });

        // when I disconnect, update the last time I was seen online
        that.lastOnlineRef.onDisconnect().set(firebase.database['ServerValue'].TIMESTAMP);
      }
    });
  }
  get lastOnlineiValue():string {
    return this.lastOnline;
  }
  get connectedValue():boolean {
    return this.connedted;
  }
  get testValue():string {
    return this.test;
  }
}
