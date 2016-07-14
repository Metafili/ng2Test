import { Component, OnInit } from '@angular/core';
import { FancyButtonComponent } from './fancy-button/fancy-button.component';

// 1. https://www.dunebook.com/how-to-develop-user-interface-with-angular-2/
// 2. http://blog.mgechev.com/2016/01/23/angular2-viewchildren-contentchildren-difference-viewproviders/
@Component({
  moduleId: module.id,
  selector: 'content-projection',
  templateUrl: 'content-projection.component.html',
  styleUrls: ['content-projection.component.css'],
  directives: [
    FancyButtonComponent
  ]
})
export class ContentProjectionComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }
}