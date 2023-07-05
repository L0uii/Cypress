import { MatPaginatorIntl } from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'Fichiers par page :';
  previousPageLabel = 'Précédente';
  nextPageLabel = 'Suivante';
  firstPageLabel = 'Première page';
  lastPageLabel = 'Dernière page';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (!length || !pageSize) {
      return `0 sur ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} sur ${length}`;
  }
}
