import { TestBed } from '@angular/core/testing';

import { FitnessNewsService } from './fitness-news.service';

describe('FitnessNewsService', () => {
  let service: FitnessNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
