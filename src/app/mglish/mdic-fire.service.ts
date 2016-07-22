import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

export interface Mword {
  word:string;
	pronun:string;
  parts?: Parts;
  langs?: Langs;
  mss:string;
  wss:string;
  timestamp:string;
}

export class Mword implements Mword {
  constructor( word, pronun, mss, wss ) {
    this.word = word;
    this.pronun = pronun;
    this.mss = mss;
    this.wss = wss;
    this.timestamp = firebase.database['ServerValue'].TIMESTAMP;
  }
}

export interface Parts {
  a:string;
}

export interface Langs {
  en: string;
  ko?:string;
  cn?:string;
  jp?:string;
}

@Injectable()
export class MdicFireService {

  words: FirebaseListObservable<any[]>; // ListObservable

  constructor( public af: AngularFire ) {
    this.words = af.database.list('/mserver/words');
  }

  getWord( word: string ) {
    return this.af.database.object('/mserver/words/' +  word);
  }

  getWords() {
    return this.words;
  }

  addMword( mWord:Mword, saveMword:any ) {
    this.words.update( mWord.word, mWord )
    .then(_ => {
      console.log("addMword: OK");
      let m = this.getWord(mWord.word);
      this.updateParts( m, mWord.word, saveMword.part, saveMword.pronun );
    })
    .catch( e => console.log("addMword: Fail"));
	}

  update( wordRef: FirebaseObjectObservable<any>, child:string, key:string, value:Object ) {
   wordRef.update(
      {[child]: {key: value}}
   )
   .then(_ => console.log("Update Size: OK"))
   .catch( e => console.log("Update Size: Fail"));
  }

  push( postsRef, object:Object ) {

  }

  updateMword( childWord: string, updateMword:any ) {
    // this.words.update( childWord, mword)o let m = this.getWord(mWord.word);
    let m = this.getWord(childWord);
    this.updateParts( m, childWord, updateMword.part, updateMword.pronun );
  }

  updateTimestamp( wordsRef, word: string, value:Object ) {
		this.update( wordsRef, word, "timestamp", value );
	}

  updatePronun( wordsRef, word:string, value:string ) {
		this.update( wordsRef, word, "pronun", value );
	}

  updateMss( wordsRef, word:string, value:string ) {
		this.update( wordsRef, word, "mss", value );
	}

  updateWss( wordsRef, word:string, value:string ) {
		this.update( wordsRef, word, "wss", value );
	}

  updateTimeStamp( wordsRef, word:string, value:string ) {
		this.update( wordsRef, word, "timestamp", value );
	}

  updateParts( wordsRef, word:string, key:string, value:string ) {
    let partsRef = this.af.database.object('/mserver/words/' +  word + '/parts');

    var part = {};
    part[key] = value;

    partsRef.update( part )
    .then(_ => console.log("updateParts: OK"))
    .catch( e => console.log("updateParts: Fail"));
    // wordsRef.update({["parts"]: part });
	}

  updateLangs( wordsRef, word:string, key:string, value:string ) {
    let langsRef = this.af.database.object('/mserver/words/' +  word + '/langs');
    var lang = {};
    lang[key] = value;
    langsRef.update( lang );
	}
}
