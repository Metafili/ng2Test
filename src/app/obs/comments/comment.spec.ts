/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Comment} from './comment';

describe('Comment', () => {
  it('should create an instance', () => {
    expect(new Comment()).toBeTruthy();
  });
});
