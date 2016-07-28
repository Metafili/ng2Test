/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { TemplateDrivenFormComponent } from './template-driven-form.component';

describe('Component: TemplateDrivenForm', () => {
  it('should create an instance', () => {
    let component = new TemplateDrivenFormComponent();
    expect(component).toBeTruthy();
  });
});
