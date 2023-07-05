import { TestBed } from '@angular/core/testing';
import { FormatFilesizePipe } from './format-filesize.pipe';

describe(FormatFilesizePipe.name, () => {
  let pipe: FormatFilesizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FormatFilesizePipe] });
    pipe = TestBed.inject(FormatFilesizePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('format when size = 0kb', () => {
    expect(pipe.transform(0)).toEqual('0 Ko');
  });

  it('format when size = 1023kb', () => {
    const value = 1023 * 1024;
    expect(pipe.transform(value)).toEqual('1023 Ko');
  });

  it('format when size = 1mb', () => {
    const value = 1 * 1024 * 1024;
    expect(pipe.transform(value)).toEqual('1.0 Mo');
  });
});
