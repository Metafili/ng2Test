import { Component, OnInit } from '@angular/core';
import { MdicFireService } from '../mdic-fire.service';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { FindBarComponent } from '../find-bar/find-bar.component';

@Component({
  moduleId: module.id,
  selector: 'get-mword',
  templateUrl: 'get-mword.component.html',
  styleUrls: ['get-mword.component.css'],
  directives: [
    FindBarComponent
  ],
  providers: [
    MdicFireService
  ]
})
export class GetMwordComponent implements OnInit {

  title: string = "Mglish Dictionary"

  word: FirebaseObjectObservable<any>;  // ObjectObservable
  words: FirebaseListObservable<any[]>; // ListObservable

  constructor( private mdicSvc: MdicFireService ) {
    this.words = mdicSvc.getWords();
  }

  ngOnInit() {
    this.word = this.mdicSvc.getWord('mglish'); // ToDo: mglish
  }

  convert( word: string ) {
    console.log('convert: ' + word );
    this.word = this.mdicSvc.getWord(word);
  }

  findWord( word:string ) {
    console.log("Find: " + word );
    if( word !== "" ){
      this.word = this.mdicSvc.getWord(word);
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    let word;
    this.word.subscribe( w => {
      if( w.$value === null )
        w.$value = w.$key + ": Not Found.";
      word = w;
    }, e => {
      console.log("Error: " + e ) ;
    }, () => {
      console.log("Completed! " )
    });
    return JSON.stringify(word);
  }
}
