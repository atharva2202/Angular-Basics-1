import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedView {
  private viewSubject = new BehaviorSubject<string>('hello'); // default view
  view$ = this.viewSubject.asObservable();

  setView(view: string) {
    this.viewSubject.next(view);
  }

  get currentView(): string {
    return this.viewSubject.getValue();
  }
}
