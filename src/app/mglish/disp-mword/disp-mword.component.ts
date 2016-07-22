import { Component, Input, Output, EventEmitter, Injectable, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { Mword, Parts, Langs } from '../mdic-fire.service';

// Select based on enum in Angular2
//  -http://stackoverflow.com/questions/35750059/select-based-on-enum-in-angular2
// How to use a typescript enum value in an Angular2 ngSwitch statement
//  -http://stackoverflow.com/questions/35835984/how-to-use-a-typescript-enum-value-in-an-angular2-ngswitch-statement
export enum DispMode {
  NONE = 0,
  NEW  = 1,
  EDIT = 2,
  DELETE = 3
}

export class NewMword {
  word:string;
  part:string;
  pronun:string;
}

@Component({
  moduleId: module.id,
  selector: 'disp-mword',
  templateUrl: 'disp-mword.component.html',
  styleUrls: ['disp-mword.component.css']
})
export class DispMwordComponent implements OnInit {

  newMword:NewMword;
  parts: any;
  partsKey:string[];

  // dispMode: DispMode;
  // Store a reference to the enum
  DISPMODE = DispMode;

  @Input() mWord: FirebaseObjectObservable<any>;
  @Input() dispMode: DispMode;
  @Input() INDEX: number;

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.dispMode = DispMode.NONE;
    this.newMword = new NewMword();
    this.partsKey = [];
  }

  /**
   * New  word, part, pronun of mWord
  */
  onNew() {
    this.dispMode = DispMode.NEW;
    this.newMword = new NewMword();
  }

  /**
   * Edit part, pronun of mWord
  */
  onEdit() {
    this.dispMode = DispMode.EDIT;
    this.newMword = new NewMword();

    this.mWord.subscribe( w => {
      this.newMword.word = w.word;
      this.partsKey.length = 0;

      this.parts = w.parts;
      if( this.parts !== undefined ) {
        Object.keys(this.parts).forEach( k => {
          this.partsKey.push(k);
        });
        this.newMword.part = this.partsKey[0] // w.parts[partsKey[0]];
        this.newMword.pronun = w.parts[this.partsKey[0]] // w.pronun;
      } else {
        this.newMword.pronun = w.pronun;
      }
    });
  }

  onSave() {
    if( this.dispMode === DispMode.NEW )
      this.add.emit( this.newMword );
    else if( this.dispMode === DispMode.EDIT )
      this.update.emit( this.newMword );
  }

  onDelete() {
    this.dispMode = DispMode.NONE;
    this.delete.emit( DispMode.DELETE );
  }

  onNext( $event, value:string ) {
    console.log("OnNext: value: " + value );
  }

  get diagMode() {
    return "DispMword: Mode: " + this.dispMode;
  }

  get diagNewMword() {
    return "DispMword: newMword: " + JSON.stringify(this.newMword);
  }

  get diagMword() {
     return "DispMword: " + JSON.stringify(this.mWord);
  }

  get diagWordInput() {
     return "DispMword: " + JSON.stringify(this.mWord);
  }
}
