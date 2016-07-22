import { Component, OnInit } from '@angular/core';
import { MdicFireService, Mword, Parts, Langs } from '../mdic-fire.service';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
// Mglish Interface
import { FindMwordComponent } from '../find-mword/find-mword.component';
import { DispMwordComponent, DispMode, NewMword } from '../disp-mword/disp-mword.component';

@Component({
  moduleId: module.id,
  selector: 'get-mword',
  templateUrl: 'get-mword.component.html',
  styleUrls: ['get-mword.component.css'],
  directives: [
    FindMwordComponent,
    DispMwordComponent
  ],
  providers: [
    MdicFireService
  ]
})
export class GetMwordComponent implements OnInit {

  title: string = "Mglish Dictionary"

  word:string;
  mWord: FirebaseObjectObservable<any>;  // ObjectObservable
  mWords: FirebaseListObservable<any[]>; // ListObservable

  dispMode: DispMode;
  INDEX:number;

  constructor( private mdicSvc: MdicFireService ) {
    this.mWords = mdicSvc.getWords();

    this.dispMode = DispMode.NONE
    this.INDEX = 0;
  }

  ngOnInit() {
    this.mWord = this.mdicSvc.getWord('mglish'); // ToDo: mglish
  }

  convert( word: string ) {
    console.log('convert: ' + word );
    this.mWord = this.mdicSvc.getWord(word);

    this.INDEX++;
    this.dispMode = DispMode.NEW;
    console.log("convert: " + word + ", Mode: " + this.dispMode + ", INDEX: " + this.INDEX);
  }

  findWord( word:string ) {
    if( word !== "" ){
      this.mWord = this.mdicSvc.getWord(word);
    }
    this.INDEX++;
    this.dispMode = DispMode.NONE;
    console.log("Find: " + word + ", Mode: " + this.dispMode + ", INDEX: " + this.INDEX);
  }

  add( addMword:NewMword ) {
    console.log("addMword: " + addMword.word );

    let newWord: Mword = new Mword( addMword.word, addMword.pronun, "", "" );
    this.mdicSvc.addMword( newWord, addMword );
    // this.mWord = this.mdicSvc.getWord(mWord.word);
    // this.mdicSvc.updateParts( this.mWord, mWord.word, mWord.parts.a, mWord.pronun );
  }

  update( updateMword:NewMword ) {
    console.log("updateMword: " + this.word );

    // let newWord: Mword = new Mword( this.word, newMword.pronun, "", "" );
    this.mdicSvc.updateMword( this.word, updateMword );
  }

  delete( word:string ) {
    console.log("Delete: " + word );
  }

  send( sendAction:string ) {
    console.log("Send: " + sendAction );
  }

  get diagMode() {
    return "GetMword: Mode: " + this.dispMode;
  }

  get diagGetMword() {
    let word:any;
    this.mWord.subscribe( w => {
      if( w.$value === null )
        w.$value = w.$key + ": Not Found.";
      word = w;
      this.word = w.word;
    }, e => {
      console.log("Error: " + e ) ;
    }, () => {
      console.log("Completed! " )
    });
    return "GetMword: " + JSON.stringify(word);
  }

  get diagSendMword() {
    return "GetMword: Received: " + this.dispMode;
  }
}
