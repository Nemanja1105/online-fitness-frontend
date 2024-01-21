import { TestBed } from '@angular/core/testing';

import { AdvisorQuestionService } from './advisor-question.service';

describe('AdvisorQuestionService', () => {
  let service: AdvisorQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisorQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
