import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ongletMr'
})
export class OngletMrPipe implements PipeTransform {
  transform(value): string {
    return value === 'Généralités' || value === 'Fiducial' ? value + ' (non visible client)' : value;
  }

}
