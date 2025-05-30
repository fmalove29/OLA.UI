import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _sidenavOpen = new BehaviorSubject<boolean>(false);
  sidenavOpen$ = this._sidenavOpen.asObservable();

  toggle() {
    this._sidenavOpen.next(!this._sidenavOpen.value);
  }

  open() {
    this._sidenavOpen.next(true);
  }

  close() {
    this._sidenavOpen.next(false);
  }
}
