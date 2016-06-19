import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NewDemoAppComponent } from '../app/ng2-test.component';

beforeEachProviders(() => [NewDemoAppComponent]);

describe('App: NewDemo', () => {
  it('should create the app',
      inject([NewDemoAppComponent], (app: NewDemoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'new-demo works!\'',
      inject([NewDemoAppComponent], (app: NewDemoAppComponent) => {
    expect(app.title).toEqual('new-demo works!');
  }));
});
