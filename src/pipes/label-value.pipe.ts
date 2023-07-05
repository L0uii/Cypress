import { LabelValue } from './../models/archives-presidence';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelValue'
})
export class LabelValuePipe implements PipeTransform {
  transform(value: string, labelValueList: LabelValue[]): string {
    let label: string;
    if (value && labelValueList?.length) {
      label = labelValueList.find(categorie => categorie.value === value)?.label;
    }
    return label ?? value;
  }
}

