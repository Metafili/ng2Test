/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ModelDrivenFormComponent } from './model-driven-form.component';

describe('Component: ModelDrivenForm', () => {
  it('should create an instance', () => {
    let component = new ModelDrivenFormComponent();
    expect(component).toBeTruthy();
  });
});
