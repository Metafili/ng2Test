/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { KakaoDataService } from './kakao-data.service';

describe('KakaoData Service', () => {
  beforeEachProviders(() => [KakaoDataService]);

  it('should ...',
      inject([KakaoDataService], (service: KakaoDataService) => {
    expect(service).toBeTruthy();
  }));
});
