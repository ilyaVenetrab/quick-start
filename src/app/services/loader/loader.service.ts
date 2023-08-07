import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  readonly show$: Observable<boolean> = this._show$.asObservable();

  setLoad(state: boolean): void {
    this._show$.next(state);
  }
}
