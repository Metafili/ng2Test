import { Component, Input, Output, EventEmitter, Injectable, OnInit } from '@angular/core';
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

export class SaveMword implements Mword {
  word:string;
  parts:Parts;
  pronun:string;
  mss:string;
  wss:string;
  timestamp:string;
}

export class NewParts implements Parts {
  a:string;
}

@Component({
  moduleId: module.id,
  selector: 'disp-mword',
  templateUrl: 'disp-mword.component.html',
  styleUrls: ['disp-mword.component.css']
})
export class DispMwordComponent implements OnInit {

  saveMword:SaveMword;

  // dispMode: DispMode;
  // Store a reference to the enum
  DISPMODE = DispMode;

  @Input() mWord: any; // FirebaseOvservableObject: Mword interface;
  @Input() dispMode: DispMode;
  @Input() INDEX: number;

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.dispMode = DispMode.NONE;
    this.saveMword = new SaveMword();
    this.saveMword.parts = new NewParts();
  }

  /**
   * New  word, part, pronun of mWord
  */
  onNew() {
    this.dispMode = DispMode.NEW;
  }

  /**
   * Edit part, pronun of mWord
  */
  onEdit() {
    this.dispMode = DispMode.EDIT;
  }

  onSave() {
    this.saveMword.timestamp = firebase.database['ServerValue'].TIMESTAMP;
    if( this.dispMode === DispMode.NEW )
      this.add.emit( this.saveMword );
    else if( this.dispMode === DispMode.EDIT )
      this.update.emit( this.saveMword );
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

  get diagMword() {
     return "DispMword: " + JSON.stringify(this.mWord);
  }

  get diagWordInput() {
     return "DispMword: " + JSON.stringify(this.mWord);
  }
}
