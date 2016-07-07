import { Component, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
  moduleId: module.id,
  selector: 'mglish-word-list',
  templateUrl: 'word-list.component.html',
  styleUrls: ['word-list.component.css']
})
export class WordListComponent implements OnInit {
  title = 'Mglish Word List';

  // currWord: string;
  word: FirebaseObjectObservable<any>;  // ObjectObservable
  words: FirebaseListObservable<any[]>; // ListObservable
  sizeSubject: Subject<any>;

  constructor( public af: AngularFire) {
    this.sizeSubject = new Subject();
    this.words = af.database.list('/mglish/words', {
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
  }

  ngOnInit() {
    this.getWord('abnormal');
  }

  getWord( word: string ) {
    // this.currWord = word;
    this.word = this.af.database.object('/mglish/words/' +  word);
    this.word.do((word:any) => {
      console.log("getWord: " + word.cmu )
    })
    .map( word => {
      word; //
    })
    .subscribe((word: any) => {
        // let k = word.$key;
        // console.log('Key: ' + k );
    });
  }

  convert( word: string ) {
    console.log('convert: ' + word );
    this.getWord( word );
  }
}
