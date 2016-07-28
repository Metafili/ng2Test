import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * Model driven form
 * -http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html
 * To enable us to test our forms without being required to rely on end-to-end tests.
 */
@Component({
  moduleId: module.id,
  selector: 'model-driven-form',
  templateUrl: 'model-driven-form.component.html',
  styleUrls: ['model-driven-form.component.css']
})
export class ModelDrivenFormComponent implements OnInit {

  registerForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      zip: new FormControl(),
      city: new FormControl()
    })
  });

  constructor() {}

  ngOnInit() {
  }

}
