import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  REACTIVE_FORM_DIRECTIVES, // for binding FormGroup/FormControl to template
  FormBuilder,              // for FormBuilder
  Validators,               // For validator
  FormGroup, FormControl
} from '@angular/forms';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';

import { Hero } from './model/hero';

/*
 * Introduction to Angular 2 Forms - Template Driven, Model Driven or In-Between
 *  -http://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
 * Using Angular 2 Template-Driven Forms
 *  -https://codequs.com/p/S1509HV_/using-angular-2-template-driven-forms/
 */

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

  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;
  newHero() {
    this.model = new Hero(42, '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
