import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'callback'
})
export class CallbackPipe implements PipeTransform {

  transform(items: any[], callback: (item: any) => boolean): any {
      const obj = Object.keys(items).map((k) => items[k]);
      if (!obj || !callback) {
          return obj;
      }
      return obj.filter(item => callback(item));
  }

}
