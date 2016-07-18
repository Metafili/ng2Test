import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'find-mword',
  templateUrl: 'find-mword.component.html',
  styleUrls: ['find-mword.component.css']
})
export class FindMwordComponent implements OnInit {

  @Output() sent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onSent($event, newWord) {
    this.sent.next(newWord.value);
    newWord.value = '';
  }
}
