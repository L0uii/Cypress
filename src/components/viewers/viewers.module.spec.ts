import { TestBed } from '@angular/core/testing';
import { ViewersModule } from './viewers.module';

describe(ViewersModule.name, () => {
  let pipe: ViewersModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ViewersModule] });
    pipe = TestBed.inject(ViewersModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
