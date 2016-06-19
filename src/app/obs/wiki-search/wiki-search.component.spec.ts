/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { WikiSearchComponent } from './wiki-search.component';

describe('Component: WikiSearch', () => {
  it('should create an instance', () => {
    let component = new WikiSearchComponent();
    expect(component).toBeTruthy();
  });
});
