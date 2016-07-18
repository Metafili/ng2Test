/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FindBarComponent } from './find-bar.component';

describe('Component: FindBar', () => {
  it('should create an instance', () => {
    let component = new FindBarComponent();
    expect(component).toBeTruthy();
  });
});
