import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'find-mword',
  templateUrl: 'find-mword.component.html',
  styleUrls: ['find-mword.component.css']
})
export class FindMwordComponent implements OnInit {

  @Output() find: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onSent($event, newWord) {
    this.find.emit(newWord.value);
    newWord.value = '';
  }
}
