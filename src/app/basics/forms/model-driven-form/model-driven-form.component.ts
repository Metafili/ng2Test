import { Component, OnInit } from '@angular/core';
import { 
  REACTIVE_FORM_DIRECTIVES, // for binding FormGroup/FormControl to template
  FormBuilder,              // for FormBuilder
  Validators,               // For validator
  FormGroup, FormControl } from '@angular/forms';

/**
 * Model driven form
 * -http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html
 * To enable us to test our forms without being required to rely on end-to-end tests.
 */
@Component({
  moduleId: module.id,
  selector: 'model-driven-form',
  templateUrl: 'model-driven-form.component.html',
  styleUrls: ['model-driven-form.component.css'],
  // Add directive for model-driven form
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class ModelDrivenFormComponent implements OnInit {

  formValue:Object;

  registerForm = new FormGroup({
    firstname: new FormControl(),
    // lastname: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      // zip: new FormControl(),
    })
  });

  // For FormBuilder
  registerFormBuilder: FormGroup;
  seachControl: FormControl;

  constructor( private formBuilder: FormBuilder )  {}

  ngOnInit() {
    this.registerFormBuilder = this.formBuilder.group({
      firstname:['', Validators.required], // first: value, second: sync validator, third: asysnc validator
      lastname:[],
      address: this.formBuilder.group({
        street:[],
        // zip:[] 
      })
    });

    this.seachControl = new FormControl();
  }

  logForm( formValue:any ) {
    this.formValue = formValue;
    console.log(JSON.stringify(formValue));
  }

  onSearch( searchValue: any ) {
    console.log(searchValue);
  }
} 
