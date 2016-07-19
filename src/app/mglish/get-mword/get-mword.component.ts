import { Component, OnInit } from '@angular/core';
import { MdicFireService } from '../mdic-fire.service';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
// Mglish Interface
import { FindMwordComponent } from '../find-mword/find-mword.component';
import { DispMwordComponent, DispMode } from '../disp-mword/disp-mword.component';

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

  word: FirebaseObjectObservable<any>;  // ObjectObservable
  words: FirebaseListObservable<any[]>; // ListObservable
  dispMode: DispMode;
  sendAction: string = "No Action";

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
      this.dispMode = DispMode.NONE;
    }
  }

  add( word:string ) {
    this.sendAction = word;
    console.log("Add: " + this.sendAction );
  }

  update( word:string ) {
    this.sendAction = word;
    console.log("Update: " + this.sendAction );
  }

  delete( word:string ) {
    this.sendAction = word;
    console.log("Delete: " + this.sendAction );
  }

  send( sendAction:string ) {
    this.sendAction = sendAction;
    console.log("Send: " + sendAction );
  }

  // TODO: Remove this when we're done
  get diagGetMword() {
    let word:any;
    this.word.subscribe( w => {
      if( w.$value === null )
        w.$value = w.$key + ": Not Found.";
      word = w;
    }, e => {
      console.log("Error: " + e ) ;
    }, () => {
      console.log("Completed! " )
    });
    return "GetMword: " + JSON.stringify(word);
  }

  get diagSendMword() {
    return "GetMword: Received: " + this.sendAction;
  }
}
