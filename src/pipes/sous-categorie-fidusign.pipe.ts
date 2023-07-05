import { FidusignCategorie } from './../services/fidusign.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sousCategorieFidusign'
})
export class SousCategorieFidusignPipe implements PipeTransform {

  transform(sousCategorieCode: string, categorieList: FidusignCategorie[]): string {
    if (sousCategorieCode && categorieList) {
      return categorieList.find(categorie => categorie.name === sousCategorieCode)?.libelle3;
    }
  }

}
