import {Injectable} from '@angular/core';
import {GroupsEnums} from 'enums/groups.enums';
import { DirectionRegionale } from 'models/conseil';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {FetchDataService} from './fetch-data.service';
import {GroupService} from './group.service';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SearchDirectionRegionaleService {

  constructor(
    private fetchDataService: FetchDataService,
    private utils: UtilsService,
    private groupService: GroupService
  ) {
  }

  private readonly _drListKey = 'GED.DRList';

  getDRList(): Observable<DirectionRegionale[]> {
    if (!this.groupService.isInGroups([
      GroupsEnums.isUserConseilCGP,
      GroupsEnums.isUserConseilBO,
      GroupsEnums.isUserConseilDRSiege,
      GroupsEnums.isUserConseilDRPlateforme
    ])) {
      return of([]);
    }

    if (this._drListKey in localStorage) {
      return of(this.utils.loadAndDecompress(this._drListKey));
    }

    return this.fetchDataService.getListDRConseil()
      .pipe(
        map((r: any) => r.entries),
        map((rows) => this.mapToSearchDRResponse(rows))
      );
  }

  combinedAllCBByDR(listDR: any[]): DirectionRegionale[] {
    return listDR.reduce(
      (acc, cur) => {
        const { societe, label, codeBudget } = cur;
        const dr = acc.find(a => a.societe === societe);
        if (!dr) {
          acc.push({
            societe,
            label,
            codeBudget: [ codeBudget ]
          });
        } else {
          dr.codeBudget.push(codeBudget);
        }
        return acc;
    }, []);
  }

  private mapToSearchDRResponse(rows: any[]): DirectionRegionale[] {
    const combinedResults = this.combinedAllCBByDR(rows);
    this.saveDRToLocalStorage(combinedResults);
    return combinedResults;
  }

  private saveDRToLocalStorage(fetchedDRList: DirectionRegionale[]) {
    const list = fetchedDRList.sort((a, b) => this.utils.sortStrings(a.societe, b.societe))
      .map(f => {
        const { societe, codeBudget, label } = f
        return {
          societe,
          label,
          codeBudget: codeBudget.join(';')
        }
      });

    this.utils.compressAndSave(this._drListKey, list);
  }
}

