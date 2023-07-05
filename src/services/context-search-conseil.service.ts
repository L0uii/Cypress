import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ContextSearchConseil} from '../models/context-search-conseil';

@Injectable({
  providedIn: 'root'
})
export class ContextSearchConseilService {

  private data: BehaviorSubject<ContextSearchConseil> = new BehaviorSubject<ContextSearchConseil>(null);

  public getContext(): ContextSearchConseil {
    return this.data.value;
  }

  public updateContext(contextProperties: Partial<ContextSearchConseil>): void {
    this.data.next(
      {
        ...this.data.value,
        ...contextProperties
      });
  }
}
