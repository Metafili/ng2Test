/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ProfileDataService } from './profile-data.service';

describe('ProfileData Service', () => {
  beforeEachProviders(() => [ProfileDataService]);

  it('should ...',
      inject([ProfileDataService], (service: ProfileDataService) => {
    expect(service).toBeTruthy();
  }));
});
