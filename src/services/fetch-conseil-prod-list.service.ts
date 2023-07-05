import { UtilsService } from './utils.service';
import {SearchEntries, SearchResult} from 'models/search';
import {Injectable} from '@angular/core';
import {GroupsEnums} from 'enums/groups.enums';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FetchDataService} from './fetch-data.service';
import {GroupService} from './group.service';
import {ProduitConseil} from '../models/conseil';

@Injectable({
  providedIn: 'root'
})
export class FetchConseilProdListService {
  private readonly prodListKey = 'Liste-Conseil-Produits';

  constructor(
    private fetchDataService: FetchDataService,
    private groupService: GroupService,
    private utilsService: UtilsService
  ) {
  }

  getProdList(): Observable<ProduitConseil[]> {
    if (!this.groupService.isInGroups([
      GroupsEnums.isUserConseilCGP,
      GroupsEnums.isUserConseilBO,
      GroupsEnums.isUserConseilDRSiege,
      GroupsEnums.isUserConseilDRPlateforme
    ])) {
      return of([]);
    }

    if (localStorage.getItem(this.prodListKey)) {
      return of(this.utilsService.loadAndDecompress(this.prodListKey));
    } else {
      return this.fetchDataService.getClassementProduitConseil().pipe(
        map((r: SearchResult) => r.entries),
        map((rows: SearchEntries[]) => this.mapToSearchProdResponse(rows)),
        tap((list: any[]) => this.utilsService.compressAndSave(this.prodListKey, list))
      );
    }
  }

  mapToSearchProdResponse(rows: SearchEntries[]): ProduitConseil[] {
    return rows.map(row => {
      return {
        nature: row.nature,
        fournisseur: row.fournisseurs[0].nom,
        produit: row.fournisseurs[0].produits
      };
    });
  }
}
