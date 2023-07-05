import {Pipe, PipeTransform} from '@angular/core';
import {ConseilService} from 'services/conseil.service';

@Pipe({
  name: 'codeBudget'
})
export class CodeBudgetPipe implements PipeTransform {
  constructor(private conseil: ConseilService) {
  }

  transform(element: string) {
    if (element) {
      return this.conseil.getDRLabelFromCodeBudget(element);
    }
  }
}
