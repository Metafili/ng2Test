import { Component, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable,
  AuthMethods, AuthProviders  } from 'angularfire2';
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
  selector: 'app-fire2',
  templateUrl: 'fire2.component.html',
  styleUrls: ['fire2.component.css']
})
export class Fire2Component implements OnInit {
  title = 'AngularFire2: Demo';
  itemKey: any;
  word: FirebaseObjectObservable<any>;  // ObjectObservable
  words: FirebaseListObservable<any[]>; // ListObservable
  sizeSubject: Subject<any>;
  mapitems: Observable<any[]>; // ListObservable

  constructor( public af: AngularFire ) {
    this.sizeSubject = new Subject();
    this.words = af.database.list('/items', {
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
    this.word = af.database.object('/items')
  }

  ngOnInit() {
        this.words.subscribe( item => {
      console.log('Item.subscribe: ' + item );
    });
    this.words.forEach( item => {
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
  }

    //JavaScript: String, TypeScript: string
  set(newKey: string, newName: string, newSize: string ) {
    // Converting a JSON Text to a JavaScript Object
    // JSON.parse() Error: Use '..' instead of ".."
    // http://www.w3schools.com/js/js_json.asp
    // Error: let jsonString:string  = "{" + newKey + ":{ name: " + newName + ", size: " + newSize + "}}";
    // JavaScript set object key by variable
    // http://stackoverflow.com/questions/2274242/using-a-variable-for-a-key-in-a-javascript-object-literal
    let jsonString:string = '{' + '"' + newKey + '"'
      + ': { "name": ' + '"' + newName + '"' + ', "size": ' + '"' + newSize + '"' + '}}';
    let jsonObj = JSON.parse(jsonString);
    console.log( "DBG" + JSON.stringify(jsonObj));
    this.word.set(
      // jsonObj
      {[newKey]: { name: newName, size: newSize }}
    )
    .then( _ => console.log("Success"))
    .catch( err => console.log(err, "Failed"));
  }

  update(newName: string, newSize: string) {
   this.word.update({ name: newName, size: newSize})
   .then(_ => console.log("Update Size: OK"))
   .catch( e => console.log("Update Size: Fail"));
    console.log("Item Updated");
  }

  push( newName: string, newSize: string ) {
    this.words.push({ name: newName, size: newSize });
  }

  updateItem( key: string, newName: string, newSize: string ) {
   this.words.update( key, {name: newName, size: newSize})
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

}
