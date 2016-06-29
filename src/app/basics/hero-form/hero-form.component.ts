import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

import { Hero } from '../hero';

@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'hero-form.component.html',
  styleUrls: ['hero-form.component.css'],
  providers: [
    MdIconRegistry
  ],
  directives: [
    MD_INPUT_DIRECTIVES,
    MdIcon,
  ]
})
export class HeroFormComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  constructor() {}

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
