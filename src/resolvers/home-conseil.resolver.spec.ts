import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchDirectionRegionaleService } from 'services/search-direction-regionale.service';

import { HomeConseilResolver } from './home-conseil.resolver';

describe('HomeConseilResolver', () => {
  let resolver: HomeConseilResolver;
  const searchDirectionRegionaleServiceStub = () => ({
    getDRList: () => of([])
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchDirectionRegionaleService,
          useFactory: searchDirectionRegionaleServiceStub
        }
      ]
    });
    resolver = TestBed.inject(HomeConseilResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
