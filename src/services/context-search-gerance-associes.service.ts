import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ContextSearchGeranceAssocies} from '../models/context-search-gerance-associes';

@Injectable({
  providedIn: 'root'
})
export class ContextSearchGeranceAssociesService {

  constructor() { }

  private data: BehaviorSubject<ContextSearchGeranceAssocies> =
    new BehaviorSubject<ContextSearchGeranceAssocies>({defaultSearch: null, selectedCustomer: null, currentTabIndex: 0});

  public getContext(): ContextSearchGeranceAssocies {
    return this.data.value;
  }

  public updateContext(contextProperties: Partial<ContextSearchGeranceAssocies>): void {
    this.data.next(
      {
        ...this.data.value,
        ...contextProperties
      });
  }
}
