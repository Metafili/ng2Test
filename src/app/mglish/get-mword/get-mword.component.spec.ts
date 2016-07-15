/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  AngularFire,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

import { MdicFireService } from '../mdic-fire.service';
import { GetMwordComponent } from './get-mword.component';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';


describe('Component: GetMword', () => {
  it('should create an instance', () => {
    let af:AngularFire;
    let service:MdicFireService = new MdicFireService(af);
    let component = new GetMwordComponent( service );
    expect(component).toBeTruthy();
  }); 
});
