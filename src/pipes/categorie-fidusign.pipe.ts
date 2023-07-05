import { FidusignCategorie } from './../services/fidusign.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'categorieFidusign'
})
export class CategorieFidusignPipe implements PipeTransform {

  transform(categorieCode: string, categorieList: FidusignCategorie[]): string {
    let label: string;
    if (categorieCode && categorieList?.length) {
      label = categorieList.find(categorie => categorie.libelle1 === categorieCode)?.libelle2;
    }
    return label ?? categorieCode
  }

}
