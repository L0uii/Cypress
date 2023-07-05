import { Pagination } from '@alfresco/js-api';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Fix an internal bug
//  inspired by: https://github.com/angular/components/issues/9105#issuecomment-415630734
export class FixedMatTableDataSource<T> extends MatTableDataSource<T> {

  private _totalItems: number;

  get totalItems(): number { return this._totalItems; }
  set totalItems(totalItems: number) { this._totalItems = totalItems; }

  public _updatePaginator(filteredDataLength: number) {
      return super._updatePaginator(this.filter === '' ? this.totalItems : filteredDataLength);
  }
}

export const nextSearchState = (apiPagination: Pagination, paginator: PageEvent, prefetchPages = 1) => {
  if (!apiPagination.hasMoreItems) {
    return null;
  }
  const prefetchAdd = (prefetchPages ? (prefetchPages * paginator.pageSize) : 0);
  const nextPosition = (paginator.pageSize * (paginator.pageIndex + 1)) - paginator.pageSize + prefetchAdd;
  const maxApi = Math.min(apiPagination.skipCount + apiPagination.count, apiPagination.totalItems);
  if (nextPosition >= maxApi) {
    return {
      skipCount: nextPosition,
    };
  }
  return null;
};

export default {
  nextSearchState
};
