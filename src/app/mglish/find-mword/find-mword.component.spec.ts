/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { FindMwordComponent } from './find-mword.component';

describe('Component: FindBar', () => {
  it('should create an instance', () => {
    let component = new FindMwordComponent();
    expect(component).toBeTruthy();
  });
});
