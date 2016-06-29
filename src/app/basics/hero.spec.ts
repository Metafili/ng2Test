/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Hero} from './hero';

describe('Hero', () => {
  it('should create an instance', () => {
    let component = new Hero( 42, 'SkyDog',
                       'Fetch any object at any distance', 'Leslie Rollover' );
    expect(component).toBeTruthy();
  });
});
