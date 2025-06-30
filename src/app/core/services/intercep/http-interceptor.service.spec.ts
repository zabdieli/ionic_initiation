import { TestBed } from '@angular/core/testing';

import { httpInterceptor } from './http-interceptor.service';

describe('httpInterceptor', () => {
  let interceptor: typeof httpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    interceptor = TestBed.inject(httpInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
