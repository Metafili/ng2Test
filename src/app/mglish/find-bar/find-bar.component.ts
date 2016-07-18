import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'find-bar',
  templateUrl: 'find-bar.component.html',
  styleUrls: ['find-bar.component.css']
})
export class FindBarComponent implements OnInit {

  @Output() sent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onSent($event, newWord) {
    this.sent.next(newWord.value);
    newWord.value = '';
  }
}
