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
// staticㅇ은 template에서 access할 수 없음. <--Security?
// https://github.com/angular/angular/issues/6429

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

  static myConnectionsRef:any;
  static lastOnlineRef: any;
  static connectedRef: any;
  static myConnections:any;
  static lastOnline:any;
  static connedted:any;
  static test:string = "TEST";
  
  // Firebase: constructor(@Inject(FirebaseRef) ref:Firebase) {
  constructor( 
    @Inject(FirebaseApp) firebaseApp: firebase.app.App, 
    af: AngularFire ) {

    this.myConnections$ = af.database.list('/users/edicon/connections');
    this.lastOnline$ = af.database.object('/users/edicon/lastOnline');
    this.connected$ = af.database.object('/.info/connected');

    this.app = firebaseApp;
    this.rootRef = this.app.database().ref();
    OfflineComponent.myConnectionsRef = this.app.database().ref('/users/edicon/connections');
    OfflineComponent.lastOnlineRef = this.app.database().ref('/users/edicon/lastOnline');
    OfflineComponent.connectedRef = this.app.database().ref('/.info/connected');

    this.rootRef.on('value', this.doSomething);
  }

  doSomething( snapshot ) {
    console.log(snapshot.val());
  }

  ngOnInit() {
    
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

    OfflineComponent.myConnectionsRef.on('value', function(snap) {
      OfflineComponent.myConnections = snap.val();
      console.log("myConnections: " + OfflineComponent.myConnections);
    });

    OfflineComponent.lastOnlineRef.on('value', function(snap) {
      OfflineComponent.lastOnline = snap.val();
      console.log("lastOnlineRef: " + OfflineComponent.lastOnline);
    });

    OfflineComponent.connectedRef.on('value', function(snap) {
      OfflineComponent.connedted = snap.val();
      console.log("connected: " + OfflineComponent.connedted);
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

        // add this device to my connections list
        // this value could contain info about the device or a timestamp too
        var con = OfflineComponent.myConnectionsRef.push(true);

        // when I disconnect, remove this device
        con.onDisconnect().remove(function(e) {
          if( e ) {
            console.error("onDisconnect: ",  e);
          }
        });

        // when I disconnect, update the last time I was seen online
        OfflineComponent.lastOnlineRef.onDisconnect().set(firebase.database['ServerValue'].TIMESTAMP);
      }
    });
  }
  get connectedValue():boolean {
    return OfflineComponent.connedted;
  }
}
