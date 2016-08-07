/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CustomLoginComponent } from './custom-login.component';

describe('Component: CustomLogin', () => {
  it('should create an instance', () => {
    let component = new CustomLoginComponent();
    expect(component).toBeTruthy();
  });
});
