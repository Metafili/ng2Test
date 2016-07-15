import { Component, OnInit } from '@angular/core';
import { MdicFireService } from '../mdic-fire.service';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'get-mword',
  templateUrl: 'get-mword.component.html',
  styleUrls: ['get-mword.component.css'],
  providers: [
    MdicFireService
  ]
})
export class GetMwordComponent implements OnInit {

  title: string = "Mglish Word"

  word: FirebaseObjectObservable<any>;  // ObjectObservable
  words: FirebaseListObservable<any[]>; // ListObservable

  constructor( private mdicSvc: MdicFireService ) {
    this.words = mdicSvc.getWords();
  }

  ngOnInit() {
    this.word = this.mdicSvc.getWord('bout');
  }

  convert( word: string ) {
    console.log('convert: ' + word );
    this.word = this.mdicSvc.getWord(word);
  }
}
