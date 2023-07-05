import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'keyValue'})
export class KeyValuePipe implements PipeTransform {
  transform(hash = {}): StringAnyMap {
    return Object.keys(hash).map(key => ({
      key,
      value: hash[key]
    }));
  }
}
