/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ExternalLibComponent } from './external-lib.component';

describe('Component: ExternalLib', () => {
  it('should create an instance', () => {
    let component = new ExternalLibComponent();
    expect(component).toBeTruthy();
  });
});
