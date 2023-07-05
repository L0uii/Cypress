import { TestBed } from '@angular/core/testing';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-intl';

describe(CustomMatPaginatorIntl.name, () => {
  let service: CustomMatPaginatorIntl;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CustomMatPaginatorIntl] });
    service = TestBed.inject(CustomMatPaginatorIntl);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
