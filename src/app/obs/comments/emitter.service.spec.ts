/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { EmitterService } from './emitter.service';

describe('Emitter Service', () => {
  beforeEachProviders(() => [EmitterService]);

  it('should ...',
      inject([EmitterService], (service: EmitterService) => {
    expect(service).toBeTruthy();
  }));
});
