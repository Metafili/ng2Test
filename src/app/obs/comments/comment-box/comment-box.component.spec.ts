/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { CommentBoxComponent } from './comment-box.component';

describe('Component: CommentBox', () => {
  it('should create an instance', () => {
    let component = new CommentBoxComponent();
    expect(component).toBeTruthy();
  });
});
