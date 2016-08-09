/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { Auth0LockService } from './auth0-lock.service';

describe('Auth0Lock Service', () => {
  beforeEachProviders(() => [Auth0LockService]);

  it('should ...',
      inject([Auth0LockService], (service: Auth0LockService) => {
    expect(service).toBeTruthy();
  }));
});
