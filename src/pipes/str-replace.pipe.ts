import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'strReplace'
})
export class StrReplacePipe implements PipeTransform {
  transform(value: string, strToReplace: string, replacementStr: string): string {

    if (!value || !strToReplace || !replacementStr) {
      return value;
    }
    return value.replace(new RegExp(strToReplace, 'g'), replacementStr);
  }
}
