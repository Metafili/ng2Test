/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AuthDataService } from './auth-data.service';

describe('AuthData Service', () => {
  beforeEachProviders(() => [AuthDataService]);

  it('should ...',
      inject([AuthDataService], (service: AuthDataService) => {
    expect(service).toBeTruthy();
  }));
});
