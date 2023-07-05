import { SearchDirectionRegionaleService } from 'services/search-direction-regionale.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DirectionRegionale } from 'models/conseil';

@Injectable({
  providedIn: 'root'
})
export class HomeConseilResolver implements Resolve<DirectionRegionale[]> {

  constructor(private searchDirectionRegionaleService: SearchDirectionRegionaleService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DirectionRegionale[]> {
    return this.searchDirectionRegionaleService.getDRList();
  }
}
