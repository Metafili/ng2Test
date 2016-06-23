import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-gestures',
  templateUrl: 'gestures.component.html',
  styleUrls: ['gestures.component.css']
})
export class GesturesComponent implements OnInit {

  dragCount: number = 0;
  panCount: number = 0;
  pressCount: number = 0;
  longpressCount: number = 0;
  swipeCount: number = 0;
  
  constructor() {}

  ngOnInit() {
  }

}
