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

  constructor( private mdicSvc: MdicFireService ) {
    this.dispMode = DispMode.NONE
    this.mWords = mdicSvc.getWords();
  }

  ngOnInit() {
    this.mWord = this.mdicSvc.getWord('mglish'); // ToDo: mglish
  }

  convert( word: string ) {
    this.mWord = this.mdicSvc.getWord(word);

    // dispMode값이 변경되지 않으면, ngOnChanges가 Trigger되지 않음(?Bug)
    // 동일한 값으로 Write한 경우에는 Trigger되는게 맞을 듯
    this.dispMode = DispMode.NONE;
    console.log("convert: " + word + ", Mode: " + this.dispMode);
  }

  findWord( word:string ) {
    if( word !== "" ){
      this.mWord = this.mdicSvc.getWord(word);
      this.dispMode = DispMode.NONE;
    }
    console.log("Find: " + word + ", Mode: " + this.dispMode);
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
