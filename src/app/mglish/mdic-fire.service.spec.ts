/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MdicFireService } from './mdic-fire.service';

describe('MdicFire Service', () => {
  beforeEachProviders(() => [MdicFireService]);

  it('should ...',
      inject([MdicFireService], (service: MdicFireService) => {
    expect(service).toBeTruthy();
  }));
});
