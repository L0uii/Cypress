import { filter, map, tap } from 'rxjs/operators';
import { UserService } from 'services/user.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FetchDataService } from './fetch-data.service';

@Injectable({
  providedIn: 'root'
})
export class CodeBudgetService {

  constructor(
    private utils: UtilsService,
    private fetchDataService: FetchDataService,
    private userService: UserService
  ) { }

  getCodeBudgetList() {
    const dictKey = 'GED.CodeBudgetDetailsList';
    if (dictKey in localStorage) {
      return of(this.utils.loadAndDecompress(dictKey));
    }

    return this.fetchDataService.getCodeBudgetDetails(this.userService.codeBudgets)
      .pipe(
        map(res => res.entries),
        filter(res => res.filter(r => this.userService.codeBudgets.includes(r.codeBudget))),
        tap(res => this.utils.compressAndSave(dictKey, res))
      )
  }
}
