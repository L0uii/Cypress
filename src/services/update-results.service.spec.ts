import { TestBed } from '@angular/core/testing';
import { UpdateResultsService } from './update-results.service';

describe(UpdateResultsService.name, () => {
  let service: UpdateResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UpdateResultsService] });
    service = TestBed.inject(UpdateResultsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
