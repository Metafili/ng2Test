/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FancyButtonComponent } from './fancy-button.component';

describe('Component: FancyButton', () => {
  it('should create an instance', () => {
    let component = new FancyButtonComponent();
    expect(component).toBeTruthy();
  });
});
