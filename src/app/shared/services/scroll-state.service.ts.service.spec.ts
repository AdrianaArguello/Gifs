import { TestBed } from '@angular/core/testing';

import { ScrollStateServiceTsService } from './scroll-state.service.ts.service';

describe('ScrollStateServiceTsService', () => {
  let service: ScrollStateServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollStateServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
