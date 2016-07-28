import { Component, OnInit } from '@angular/core';

/**
 * Template-driven forms in angular 2
 *  -http://blog.thoughtram.io/angular/2016/03/21/template-driven-forms-in-angular-2.html
 */
@Component({
  moduleId: module.id,
  selector: 'app-template-driven-form',
  templateUrl: 'template-driven-form.component.html',
  styleUrls: ['template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

  formValue:Object;
  // For expression
  firstname = 'Pascal';
  lastname = 'Precht';

  constructor() {}

  ngOnInit() {
  }

  logForm( formValue:any ) {
    this.formValue = formValue;
    console.log(JSON.stringify(formValue));
  }

  get diagLogForm() {
    return JSON.stringify(this.formValue);
  }
}

