/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ChildRouteComponent } from './child-route.component';

describe('Component: ChildRoute', () => {
  it('should create an instance', () => {
    let component = new ChildRouteComponent();
    expect(component).toBeTruthy();
  });
});
