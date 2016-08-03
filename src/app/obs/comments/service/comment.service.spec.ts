/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { CommentService } from './comment.service';

describe('Comment Service', () => {
  beforeEachProviders(() => [CommentService]);

  it('should ...',
      inject([CommentService], (service: CommentService) => {
    expect(service).toBeTruthy();
  }));
});
