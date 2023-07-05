import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from 'services/utils.service';

@Pipe({
  name: 'origineMR'
})
export class OrigineMRPipe implements PipeTransform {
  constructor(public utils: UtilsService) {
  }

  transform(value): string {
    const regexPoint = /\./g;
    const creator = value.Author ?
      this.utils.capitalizeAll(value.Author.replace(regexPoint, ' ')) : value.Creator === 'lem' ?
        'Lettre de mission' : undefined;
    return (value.Application === 'WINSIS' || value.Application === 'GEDUP') && creator ? `${creator}` : undefined;
  }
}
