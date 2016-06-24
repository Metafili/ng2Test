import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-gestures',
  templateUrl: 'gestures.component.html',
  styleUrls: ['gestures.component.css']
})
export class GesturesComponent implements OnInit {

  dragCount: number = 0;
  dragStartCount: number = 0;
  dragEndCount: number = 0;
  dragRightCount: number = 0;
  dragLeftCount: number = 0;
  panCount: number = 0;
  pressCount: number = 0;
  longPressCount: number = 0;
  swipeCount: number = 0;
  swipeUpCount: number = 0;
  swipeDownCount: number = 0;
  swipeLeftCount: number = 0;
  swipeRightCount: number = 0;

  constructor() {}

  ngOnInit() {
  }

  onDrag( e ) {
    this.dragCount = this.dragCount + 1;
  }
  onDragStart( e ) {
    this.dragStartCount = this.dragStartCount + 1;
    this.initGestureCount();
    console.log( e );
  }
  onDragEnd( e ) {
    this.dragEndCount = this.dragEndCount + 1;
    // this.initGestureCount();
  }
  onDragUp() {};
  unDragDown() {}
  onDragLeft( e ) {
    this.dragLeftCount = this.dragLeftCount + 1;
  }
  onDragRight( e ) {
    this.dragRightCount = this.dragRightCount + 1;
  }
  onPan( e ) {
    this.panCount = this.panCount + 1;
  }
  onPress( e ) {
    this.pressCount = this.pressCount + 1;
  }
  onLongPress( e ) {
    this.longPressCount = this.longPressCount + 1;
  }
  onSwipe( e ) {
    this.swipeCount = this.swipeCount + 1;
    // this.swipeLeftRight();
  }
  onSwipeUp( e ) {
    this.swipeUpCount = this.swipeUpCount + 1;
  }
  onSwipeDown( e ) {
    this.swipeDownCount = this.swipeDownCount + 1;
  }
  onSwipeLeft( e ) {
    this.swipeLeftCount = this.swipeLeftCount + 1;
  }
  onSwipeRight( e ) {
    this.swipeRightCount = this.swipeRightCount + 1;
  }
  swipeLeftRight() {
    if ( this.dragRightCount > 0 && this.swipeCount > 0 ) {
      this.swipeRightCount = 1;
    } else if ( this.dragLeftCount > 0 && this.swipeCount > 0) {
      this.swipeLeftCount = 1;
    }
  }
  initGestureCount() {
    this.dragCount = 0;
    this.dragStartCount = this.dragEndCount = 0;
    this.dragLeftCount = this.dragRightCount = 0;
    this.panCount = 0;
    this.pressCount = this.longPressCount = 0;
    this.swipeCount = 0;
    this.swipeUpCount = this.swipeDownCount = 0;
    this.swipeLeftCount = this.swipeRightCount = 0;
  }
}

