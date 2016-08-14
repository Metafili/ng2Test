/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MapToIterablePipe } from './map-to-iterable.pipe';

describe('Pipe: MapToIterable', () => {
  it('create an instance', () => {
    let pipe = new MapToIterablePipe();
    expect(pipe).toBeTruthy();
  });
});
