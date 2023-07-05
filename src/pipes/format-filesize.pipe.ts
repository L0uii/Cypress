import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFilesize'
})
export class FormatFilesizePipe implements PipeTransform {

  transform(sizeInBytes: number, args?: any): any {
    if (!sizeInBytes || sizeInBytes === 0) {
      return '0 Ko';
    }

    const sizeInMb = sizeInBytes / (1024 * 1024);

    return sizeInMb < 1 ? `${Math.ceil(sizeInBytes / 1024)} Ko` : `${sizeInMb.toFixed(1)} Mo`
  }

}
