import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadspinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  public readonly isLoading$ = this.loadingSubject.asObservable();

  show(): void {
    this.requestCount++;
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.requestCount = Math.max(0, this.requestCount - 1);
    if (this.requestCount === 0) {
      this.loadingSubject.next(false);
    }
  }
}
