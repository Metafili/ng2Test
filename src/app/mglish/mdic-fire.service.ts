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

  addMword( mWord:Mword ) {
    this.words.update( mWord.word, mWord )
    .then(_ => {
      console.log("addMword: OK");
      let m = this.getWord(mWord.word);
      this.updateParts( m, mWord.word, mWord.parts.a, mWord.pronun );
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

  updateMword( wordsRef, childWord: string, mword:Mword ) {
    this.words.update( childWord, mword)
    .then(_ => console.log("updateMword: OK"))
    .catch( e => console.log("updateMword: Fail"));
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
    var part = {};
    part[key] = value;
    wordsRef.update({["parts"]: part });
	}

  /*
  updateLangs( wordsRef, word:string, lang:string, value:string ) {
		wordRef = wordsRef.child(word);
		this.update( wordRef, "langs", lang, value );
	}

  updateParts( wordsRef, word, part:string, value:string ) {
		wordRef = wordsRef.child(word);
		this.update( wordRef, "parts", part, value );
	}
  */
}
