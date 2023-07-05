import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { FormatDatePipe } from './format-date.pipe';

describe(FormatDatePipe.name, () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    const translateServiceStub = () => ({ currentLang: 'fr' });
    TestBed.configureTestingModule({
      providers: [
        FormatDatePipe,
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    pipe = TestBed.inject(FormatDatePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms Date format to dd/MM/yyyy', () => {
    const value = new Date(2000, 11, 31);
    expect(pipe.transform(value)).toEqual('31/12/2000');
  });
});
