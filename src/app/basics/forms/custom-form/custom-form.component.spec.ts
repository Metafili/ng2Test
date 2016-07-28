/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CustomFormComponent } from './custom-form.component';

describe('Component: CustomForm', () => {
  it('should create an instance', () => {
    let component = new CustomFormComponent();
    expect(component).toBeTruthy();
  });
});
