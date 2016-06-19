import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2TestAppComponent } from '../app/ng2-test.component';

beforeEachProviders(() => [Ng2TestAppComponent]);

describe('App: Ng2 Test', () => {
  it('should create the app',
      inject([Ng2TestAppComponent], (app: Ng2TestAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'Ng2 Test\'',
      inject([Ng2TestAppComponent], (app: Ng2TestAppComponent) => {
    expect(app.title).toEqual('Ng2 Test');
  }));
});
