import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

enum DispMode {
  NONE = 0,
  NEW  = 1,
  EDIT = 2,
  DELETE = 3
}

@Component({
  moduleId: module.id,
  selector: 'disp-mword',
  templateUrl: 'disp-mword.component.html',
  styleUrls: ['disp-mword.component.css']
})
export class DispMwordComponent implements OnInit {
  dispMode: DispMode = DispMode.NONE;
  @Input() mWord: any; // FirebaseOvservableObject: Mword interface;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.dispMode = DispMode.NONE;
  }

  /**
   * New  word, part, pronun of mWord
  */
  new() {
   this.dispMode = DispMode.NEW;
  }

  /**
   * Edit part, pronun of mWord
  */
  edit() {
   this.dispMode = DispMode.EDIT;
  }

  save() {
   this.saveMword();
  }

  deleteMword() {
   this.dispMode = DispMode.DELETE;
   this.delete.emit( this.dispMode );
  }

  saveMword() {
    switch( this.dispMode ) {
      case DispMode.NONE:
      default:
        this.dispMode = DispMode.NONE;
        break;
      case DispMode.NEW:
        this.add.emit( this.dispMode );
        break;
      case DispMode.EDIT:
        this.update.emit( this.dispMode );
        break;
    }
  }

  get diagnostic() {
    return "DispMword: Mode: " + this.dispMode;
  }
  get diagMword() {
     return "DispMword: " + JSON.stringify(this.mWord);
  }
}
