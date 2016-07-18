import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'disp-mword',
  templateUrl: 'disp-mword.component.html',
  styleUrls: ['disp-mword.component.css']
})
export class DispMwordComponent implements OnInit {
  action: string = "Action";
  @Input() mWord: any = "No Mword"; // FirebaseOvservableObject: Mword interface;
  @Output() sent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.action = "No Action";
  }

  update( $event ) {
   this.action = "update";
   this.onSendMword( $event, this.action );
  }

  add( $event ) {
   this.action = "add";
   this.onSendMword( $event, this.action );
  }

  save( $event ) {
   this.action = "save";
   this.onSendMword( $event, this.action );
  }

  delete( $event ) {
   this.action = "delete";
   this.onSendMword( $event, this.action );
  }

  onSendMword( $event, mAction ) {
    if( this.action !== null )
      this.sent.next( mAction );
  }

  get diagnostic() {
    return "DispMword: Send: " + this.action;
  }
  get diagMword() {
     return "DispMword: " + JSON.stringify(this.mWord);
  }
}
