/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ContentProjectionComponent } from './content-projection.component';

describe('Component: ContentProjection', () => {
  it('should create an instance', () => {
    let component = new ContentProjectionComponent();
    expect(component).toBeTruthy();
  });
});
