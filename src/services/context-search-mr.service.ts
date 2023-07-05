import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ContextSearchExpertise} from '../models/context-search-expertise';

@Injectable({
  providedIn: 'root'
})
export class ContextSearchMrService {

  private data: BehaviorSubject<ContextSearchExpertise> = new BehaviorSubject<ContextSearchExpertise>(null);

  constructor() {
  }

  public getContext(): ContextSearchExpertise {
    return this.data.value;
  }

  public updateContext(contextProperties: Partial<ContextSearchExpertise>): void {
    this.data.next(
      {
        ...this.data.value,
        ...contextProperties
      });
  }

}
